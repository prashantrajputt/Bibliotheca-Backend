const mongoose = require("mongoose");

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	try {
		mongoose.connect('mongodb+srv://prashantkumar12672:kdr0bpaCBg3jPo4F@cluster0.ml5ko.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', connectionParams);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
}