import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";
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
  try {
    const { email, password } = await req.json();
    const client = await clientPromise;
    const db = client.db("db");
    const collection = db.collection("users");

    const userObject = await collection.findOne({ email });

    if (!userObject) {
      return NextResponse.json(
        { message: "Du verkar inte finnas med i vårt system. Kontakta admin." },
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

    if (userObject.email && validUser) {
      const response = NextResponse.json({
        userName: userObject.name,
        admin: userObject.admin,
      });
      response.cookies.set(
        "user",
        JSON.stringify({
          username: userObject.name,
          admin: userObject.admin,
        }),
        {
          maxAge: 3600,
          path: "/",
        }
      );

      return response;
    }

    if (!userObject.email) {
      return NextResponse.json(
        {
          message: "Du verkar inte finnas med i vårt system. Kontakta admin.",
        },
        { status: 404 }
      );
    }

    if (userObject.email && !isAdminPassword && !isUserPassword) {
      return NextResponse.json(
        {
          message: "Fel lösenord, försök igen.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Fel epostadress eller lösenord, försök igen.",
      },
      { status: 404 }
    );
  } catch (error) {
    console.error("Fel i POST /api/user:", error);
    return NextResponse.json({ error: "Fel vid inloggning." }, { status: 500 });
  }
};


export const PUT = async (req) => {
  try {
    const { week } = await req.json();
    const client = await clientPromise;
    const db = client.db("db");
    const collection = db.collection("users");

    const targetWeek = week - 1;

    // Steg 1: hitta användare som har objektet { week: targetWeek } i weeks-arrayen
    const usersWithWeek = await collection.find({
      weeks: { $elemMatch: { week: targetWeek } }
    }).toArray();

    if (usersWithWeek.length === 0) {
      return NextResponse.json({ message: `Ingen användare har vecka ${targetWeek}.` }, { status: 200 });
    }

    // Steg 2: ta bort alla week-objekt med matchande vecka från weeks-arrayen
    await collection.updateMany(
      { "weeks.week": targetWeek },
      { $pull: { weeks: { week: targetWeek } } }
    );

    return NextResponse.json({ message: `Vecka ${targetWeek} togs bort från relevanta användare.` }, { status: 200 });

  } catch (error) {
    console.error('Fel i PUT-funktionen:', error);
    return NextResponse.json({ error: 'Serverfel vid uppdatering' }, { status: 500 });
  }
};


export const DELETE = async () => {
  try {
    const cookieStore = await cookies();
    const isUser = cookieStore.get("user");

    if (isUser) {
      // Instruera webbläsaren att ta bort cookien
      const response = new Response(
        JSON.stringify({ message: "Cookie borttagen!" }),
        { status: 200 }
      );

      response.headers.set(
        "Set-Cookie",
        `user=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
      );

      return response;
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
