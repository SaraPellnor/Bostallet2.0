import clientPromise from "../../../lib/mongodb";
import { cookies } from "next/headers";

export const GET = async (req) => {
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
    // Koppla till databasen
    const client = await clientPromise;
    const db = client.db("db"); // Använd din databasnamn här
    const collection = db.collection("users"); // Använd din collection för användare

    // Hämta alla användare från databasen
    const data = await collection.find().toArray();

    if (data.length > 0) {
      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "Data hittades inte!" }), {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Fel vid anslutning till databasen eller hämtning av data.",
      }),
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
  const { name, week, pass, action } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db("db");
    const collection = db.collection("users");

    const user = await collection.findOne({ name });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Användare hittades inte." }),
        { status: 404 }
      );
    }

    const weekIndex = user.weeks.findIndex((w) => w.week === week);

    if (action === "remove") {
      if (weekIndex !== -1) {
        const updatedPasses = user.weeks[weekIndex].pass.filter(
          (p) => p !== pass
        );

        if (updatedPasses.length === 0) {
          // Ta bort hela veckan
          user.weeks.splice(weekIndex, 1);
        } else {
          // Uppdatera pass-listan
          user.weeks[weekIndex].pass = updatedPasses;
        }

        await collection.updateOne({ name }, [
          {
            $set: {
              weeks: user.weeks, // uppdaterar weeks
              stars: {
                $cond: [
                  { $gt: ["$stars", 0] }, // om stars > 0
                  { $subtract: ["$stars", 1] }, // minska med 1
                  0, // annars sätt till 0
                ],
              },
            },
          },
        ]);

        return new Response(
          JSON.stringify({ message: "Pass borttaget framgångsrikt." }),
          { status: 200 }
        );
      } else {
        return new Response(JSON.stringify({ message: "Vecka inte hittad." }), {
          status: 404,
        });
      }
    } else if (action === "add") {
      if (weekIndex === -1) {
        // Veckan finns inte, lägg till ny vecka med pass
        user.weeks.push({ week, pass: [pass] });
      } else {
        const existingPasses = user.weeks[weekIndex].pass;
        if (!existingPasses.includes(pass)) {
          user.weeks[weekIndex].pass.push(pass);
        } else {
          return new Response(
            JSON.stringify({
              message: "Passet finns redan för den här veckan.",
            }),
            { status: 400 }
          );
        }
      }

      await collection.updateOne(
        { name },
        {
          $set: { weeks: user.weeks },
          $inc: { stars: +1 },
        }
      );

      return new Response(
        JSON.stringify({ message: "Vecka och/eller pass tillagda." }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "Ogiltig åtgärd. Använd 'add' eller 'remove'.",
        }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Fel:", error);
    return new Response(
      JSON.stringify({
        error: "Något gick fel med databasen.",
      }),
      { status: 500 }
    );
  }
};


export async function POST(req) {
  try {
    const { name, message, week, passNumber } = await req.json();

    const client = await clientPromise;
    const db = client.db("db");
    const collection = db.collection("users");

    if (!message || message.trim() === "") {
      // Ta bort meddelande för ett visst pass
      await collection.updateOne(
        { name },
        {
          $pull: {
            "weeks.$[w].messages": { pass: passNumber }
          }
        },
        {
          arrayFilters: [{ "w.week": week }]
        }
      );
    } else {
      // Skapa messages-array om den saknas i veckan
      await collection.updateOne(
        { name, "weeks.week": week, "weeks.messages": { $exists: false } },
        { $set: { "weeks.$.messages": [] } }
      );

      // Försök uppdatera befintligt message för passet
      const result = await collection.updateOne(
        { name },
        {
          $set: { "weeks.$[w].messages.$[m].message": message }
        },
        {
          arrayFilters: [
            { "w.week": week },
            { "m.pass": passNumber }
          ]
        }
      );

      // Om inget message fanns → lägg till nytt
      if (result.modifiedCount === 0) {
        await collection.updateOne(
          { name, "weeks.week": week },
          {
            $push: {
              "weeks.$.messages": { pass: passNumber, message }
            }
          }
        );
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}
