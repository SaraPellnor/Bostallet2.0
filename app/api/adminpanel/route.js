import clientPromise from "../../../lib/mongodb";
import { cookies } from "next/headers";
export const GET = async () => {
  try {
           const cookieStore = await cookies();
        const isUser = cookieStore.get("user");    
        if (isUser) {
          console.log("User is authenticated");
        } else {
          return new Response(JSON.stringify({ message: "Data hittades inte!" }), {
            status: 404,
          });
        }
    const client = await clientPromise;
    const db = client.db("db"); // Här används "db" om du inte skickar in ett namn
    const collection = db.collection("users");

    // Hämta alla användare
    const users = await collection.find({}).toArray();

    if (users.length > 0) {
      return new Response(JSON.stringify(users), { status: 200 });
    } else {
      return new Response(
        JSON.stringify({ message: "Inga användare hittades!" }),
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    console.error("Fel vid hämtning från MongoDB:", error);
    return new Response(
      JSON.stringify({ error: "Fel vid hämtning från databasen." }),
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    const { name, email, mobile, isAdmin } = await req.json();

    const client = await clientPromise;
    const db = client.db("db"); // använder "db" från din connection string
    const collection = db.collection("users");

    // Kolla om användaren redan finns
    const userExists = await collection.findOne({ email });

    if (userExists) {
      return new Response(
        JSON.stringify({ message: "Användaren finns redan" }),
        { status: 400 }
      );
    }

    // Skapa ny användare
    const newUser = {
      admin: isAdmin,
      name: name,
      email: email,
      mobile: mobile,
      weeks: [],
    };

    // Spara till databasen
    await collection.insertOne(newUser);

    return new Response(
      JSON.stringify({ message: "Användare tillagd!", userData: newUser }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Fel vid skapande av användare:", error);
    return new Response(
      JSON.stringify({
        message: "Fel vid hantering av data",
        error: error.message,
      }),
      {
        status: 500,
      }
    );
  }
};

// jag behöver skicka med värdet för user...       <--------------------------------------

export const PUT = async (req) => {
  const { week, pass, user, name, mobile, email, isAdminCheckBox } =
    await req.json();

  try {
    const client = await clientPromise;
    const db = client.db("db");
    const collection = db.collection("users");

    // Hitta användaren
    const existingUser = await collection.findOne({ email: user.email });

    if (!existingUser) {
      return new Response(
        JSON.stringify({ message: "Användare hittades inte." }),
        { status: 404 }
      );
    }

    // Förbered uppdateringsobjekt
    const updatedUser = {
      name,
      mobile,
      email,
      admin: isAdminCheckBox,
    };

    // Uppdatera namn, mobil, email, admin-status
    await collection.updateOne({ email: user.email }, { $set: updatedUser });

    // Om vecka och pass skickas in – uppdatera weeks-fältet
    if (week && pass !== undefined) {
      // Ta bort passet från rätt vecka
      await collection.updateOne(
        {
          email: user.email,
        },
        {
          $pull: {
            [`weeks.$[weekElem].pass`]: pass,
          },
        },
        {
          arrayFilters: [{ "weekElem.week": week }],
        }
      );

      // Kontrollera om veckan är tom, ta bort den helt
      const updatedUserAfter = await collection.findOne({ email: email });
      const targetWeek = updatedUserAfter.weeks.find((w) => w.week === week);

      if (targetWeek && targetWeek.pass.length === 0) {
        await collection.updateOne(
          { email: email },
          {
            $pull: {
              weeks: { week: week },
            },
          }
        );
      }
    }

    return new Response(
      JSON.stringify({ message: "Pass borttaget och uppgifter uppdaterade." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Fel i PUT:", error);
    return new Response(
      JSON.stringify({ error: "Fel vid uppdatering av användare." }),
      { status: 500 }
    );
  }
};

export const DELETE = async (req) => {
  const { email } = await req.json();

  try {
    // Koppla till databasen
    const client = await clientPromise;
    const db = client.db("db"); // Använd din databasnamn här
    const collection = db.collection("users"); // Använd din collection för användare

    // Försök hitta användaren i databasen
    const user = await collection.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Användare hittades inte." }),
        { status: 404 }
      );
    }

    // Ta bort användaren från databasen
    await collection.deleteOne({ email });

    return new Response(JSON.stringify({ message: "Användare borttagen." }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error:
          "Fel vid anslutning till databasen eller borttagning av användare.",
      }),
      { status: 500 }
    );
  }
};
