class AuthController {
  static login(req, res) {
    console.log(req.body);
    res.cookie("hello", "value", { maxAge: 60000 * 60 * 2, httpOnly: true });
    res.status(200).send({ message: "Auth success" });
  }
  static logout(req, res) {
    console.log(req.cookies);

    res.send(`<h1>Logauth</h1>`);
  }
}

export default AuthController;
