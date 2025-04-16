import clientPromise from "../../../lib/mongodb";

import { cookies } from "next/headers";

export const GET = async () => {
  try {
    // Läs JSON-filen
    const cookieStore = await cookies();
    const isUser = cookieStore.get("user");
    const decodedUser = decodeURIComponent(isUser.value);

    if (decodedUser) {
      return new Response(decodedUser, { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "Data hittades inte!" }), {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Fel vid läsning av filen." }),
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  const { email, password } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db("db");
    const collection = await db.collection("users");

    const userObject = await collection.findOne({ email });

    if (!userObject) {
      return new Response(
        JSON.stringify({
          message: "Du verkar inte finnas med i vårt system. Kontakta admin.",
        }),
        { status: 404 }
      );
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    const userPassword = process.env.USER_PASSWORD;

    const isAdminPassword = adminPassword === password;
    const isUserPassword = userPassword === password;

    const validUser =
      (userObject.admin && isAdminPassword) ||
      (!userObject.admin && isUserPassword);
    console.log("validUser", validUser);

    if (userObject.email && validUser) {
      const cookieStore = await cookies();
      userObject &&
        cookieStore.set(
          "user",
          JSON.stringify({
            username: userObject.name,
            admin: userObject.admin,
          }),
          { maxAge: 3600 }
        );

      return new Response(
        JSON.stringify({ userName: userObject.name, admin: userObject.admin }),
        { status: 200 }
      );
    } else if (!userObject.email) {
      return new Response(
        JSON.stringify({
          message: "Du verkar inte finnas med i vårat system. Kontakta admin.",
        }),
        { status: 404 }
      );
    } else if (userObject.email && !isAdminPassword && !isUserPassword) {
      return new Response(
        JSON.stringify({
          message: "Fel lösenord, försök igen.",
        }),
        { status: 404 }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "Fel epostaddress eller lösenord, försök igen.",
        }),
        { status: 404 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Fel vid läsning av filen." }),
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
  const { week } = await req.json(); // t.ex. { "week": 15 }

  if (!week || typeof week !== "number") {
    return new Response(JSON.stringify({ error: "Ogiltig veckodata." }), { status: 400 });
  }

  const weekToRemove = week > 1 ? week - 1 : 52;
console.log("weekToRemove", weekToRemove); // Debugging

  try {
    const client = await clientPromise;
    const db = client.db("db"); // <-- Din databas heter "db"
    const collection = db.collection("users");

    // Uppdatera alla användare och ta bort rätt vecka ur weeks-arrayen
    const result = await collection.updateMany(
      {},
      { $pull: { weeks: { week: weekToRemove } } }
    );

    return new Response(
      JSON.stringify({
        message: `Vecka ${weekToRemove} borttagen för ${result.modifiedCount} användare.`,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Fel vid uppdatering:", error);
    return new Response(JSON.stringify({ error: "Kunde inte uppdatera användarna." }), {
      status: 500,
    });
  }
};

export const DELETE = async () => {
  try {
    const cookieStore = await cookies();
    const isUser = cookieStore.get("user");

    if (isUser) {
      // Ta bort cookien
      cookieStore.delete("user");

      return new Response(
        JSON.stringify({ message: "Cookie har tagits bort!" }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Cookie hittades inte!" }),
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Fel vid borttagning av cookie." }),
      { status: 500 }
    );
  }
};
