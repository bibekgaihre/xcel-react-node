const UserModel = require("./user.model");
const DataXModel = require("./datax.model");
const DataYModel = require("./datay.model");

module.exports = {
  onTestApi: async (req, res) => {
    console.log("---API called--");
    res.json({ message: "Server responded" });
  },
  onSaveData1: async (req, res) => {
    try {
      let payload = req.body;
      let data = await DataXModel.create(payload);
      res.json(data);
    } catch (error) {
      throw error;
    }
  },
  onSaveData2: async (req, res) => {
    try {
      let payload = req.body;
      let data = await DataYModel.create(payload);
      res.json(data);
    } catch (error) {
      throw error;
    }
  },
  processData: async (req, res) => {
    try {
      //merge the data and push to db
      let d = await DataXModel.aggregate([
        {
          $facet: {
            matched: [
              {
                $lookup: {
                  from: "datays",
                  localField: "uniqueId",
                  foreignField: "uniqueId",
                  as: "result",
                },
              },
              {
                $unwind: "$result",
              },
              {
                $project: {
                  _id: 0,
                  sn: 1,
                  id: 1,
                  uniqueId: 1,
                  name: "$result.name",
                  email: "$result.email",
                  phonenumber: "$result.phoneNumber",
                },
              },
            ],
            unmatched: [
              {
                $lookup: {
                  from: "datays",
                  localField: "uniqueId",
                  foreignField: "uniqueId",
                  as: "result",
                },
              },
              {
                $match: {
                  $expr: {
                    $eq: [{ $size: "$result" }, 0],
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                  sn: 1,
                  id: 1,
                  uniqueId: 1,
                },
              },
            ],
          },
        },
        { $project: { merged: { $setUnion: ["$matched", "$unmatched"] } } },
        { $unwind: "$merged" },
        { $replaceRoot: { newRoot: "$merged" } },
        { $out: "users" },
      ]);
      //list the data on datatable

      //   }
      if (d.length === 0) {
        res.json({ message: "Data Processed" });
      }
    } catch (error) {
      throw error;
    }
  },
  getUsers: async (req, res) => {
    try {
      let data = await UserModel.find({});
      res.json(data);
    } catch (error) {
      throw error;
    }
  },
  //   updateData: async (req, res) => {
  //     //change the id;
  //   },
};
