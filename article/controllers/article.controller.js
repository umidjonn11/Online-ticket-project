import {Article} from "../models/index.js";

export const createArticle = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const article = new Article({
      title,
      content,
    });

    await article.save();

    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};

// Get all articles
export const getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

// Get a specific article by ID
export const getArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

// Update an article by ID
export const updateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const article = await Article.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

// Delete an article by ID
export const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const article = await Article.findByIdAndDelete(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    next(error);
  }
};
