const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// MongoDB connection
const MONGODB_URI =
  "mongodb+srv://evanshankman:Testing1234@cluster0.61dimjd.mongodb.net/inethi_stories?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Story Schema and Model
const storySchema = new mongoose.Schema({
  category: String,
  title: String,
  views: { type: Number, default: 0 }, //Number if times a story has been viewed, initially is zero
  downloads: { type: Number, default: 0 },
  content: String, // Field for storing HTML content
});

const Story = mongoose.model("Story", storySchema);

// Function to upload a story
async function uploadStory(category, title, views, content) {
  try {
    const newStory = new Story({ category, title, views, content });
    await newStory.save();
    console.log(`Story titled "${title}" uploaded successfully.`);
  } catch (error) {
    console.error("Error uploading story:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Read HTML file
const filePath = path.join(__dirname, "CyberHoliday.html");
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    return console.error("Error reading file:", err);
  }

  // Sample story data
  const sampleStory = {
    category: "Cyber Security",
    title: "CyberHoliday",
    views: 0,
    downloads: 0,
    content: data,
  };

  // Upload the sample story
  uploadStory(
    sampleStory.category,
    sampleStory.title,
    sampleStory.views,
    sampleStory.content
  );
});
