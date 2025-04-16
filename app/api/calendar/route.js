import clientPromise from "../../../lib/mongodb";

export const GET = async (req) => {
  try {
    // Koppla till databasen
    const client = await clientPromise;
    const db = client.db("db");  // Använd din databasnamn här
    const collection = db.collection("users");  // Använd din collection för användare

    // Hämta alla användare från databasen
    const data = await collection.find().toArray();

    if (data.length > 0) {
      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      return new Response(
        JSON.stringify({ message: "Data hittades inte!" }),
        { status: 404 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Fel vid anslutning till databasen eller hämtning av data." }),
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

        await collection.updateOne({ name }, { $set: { weeks: user.weeks } });

        return new Response(
          JSON.stringify({ message: "Pass borttaget framgångsrikt." }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({ message: "Vecka inte hittad." }),
          { status: 404 }
        );
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

      await collection.updateOne({ name }, { $set: { weeks: user.weeks } });

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

