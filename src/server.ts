import app from "./app";

const PORT = process.env.PORT || 3000;

//APP LISTENS ON PORT 3000
app.listen(PORT, () => console.log("Server started on port 3000"));
