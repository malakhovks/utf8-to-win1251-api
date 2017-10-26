import log from "../libs/log";
import iconv from "iconv-lite";
import bodyParser from "body-parser";

module.exports = app => {

	const textBodyParser = bodyParser.text({limit: '5mb'});
	app.get("/api/utf8towin1251", (req, res) => {
		return res.status(200).json({status: "utf8 ot win1251 API"});

		//TODO res.flush() (node:28258) DeprecationWarning: OutgoingMessage.flush is deprecated. Use flushHeaders instead.
		// res.flush();

	});

	app.post("/api/utf8towin1251", textBodyParser, (req, res) => {

		if (!req.body) return res.sendStatus(400);

		log.debug(req.body);
		const win1251 = iconv.encode(req.body, "win1251");
		log.debug(win1251);

		res.set({'content-type': 'text/plain;charset=win-1251'});
		res.status(200).send(win1251);
		res.flush();

	});
};