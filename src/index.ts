import app from "./app"
const PORT: any = process.env.PORT || 3000

app.listen(PORT, () => console.log(`SERVER ON PORT ${PORT}`));