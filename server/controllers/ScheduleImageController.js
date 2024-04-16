import ScheduleImage from "../models/ScheduleImage.js";

export const createScheduleImage = async (req, res) => {
  try {
    const { scheduleOne, scheduleTwo, date } = req.body;

    if (!scheduleOne || !scheduleTwo || !date) {
      return res.status(401).json({
        message: "Заполните все поля",
      });
    }

    const schedule = new ScheduleImage({ scheduleOne, scheduleTwo, date });

    await schedule.save();

    res.status(200).json(schedule);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать расписание",
    });
  }
};

export const findLastElement = async (req, res) => {
  const response = await ScheduleImage.find().sort({ createdAt: -1 }).limit(1);
  if (!response) {
    return res.status(400).json("ничего не найдено");
  }
  return res.status(200).json(...response);
};

export const findAllElements = async (req, res) => {
  const page = Number(req.query.counter);
  const data = req.query.data
  console.log('data', data)
if(data !==undefined) {
  const items = await ScheduleImage.findOne( {createdAt: { $gt: new Date(data)}}  )
  console.log('result', items)
  if(items == null) {
    return res.status(400).json({message:"К сожалению не удалось найти расписание."})
  }
  if(items !== null) {
    return res.status(200).json([items])
  } 
}
  const limit = 3;
  const skip = (page - 1) * limit;

  try {
    const items = await ScheduleImage.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
