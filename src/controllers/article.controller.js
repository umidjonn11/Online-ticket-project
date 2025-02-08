import Article from "../models/Article.js";

export const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = new Article({ title, content, author: req.user.id });
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const query = req.query;
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;
    const articles = await Article.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "author",
      "username email"
    );
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not allowed to update this article" });
    }

    article.title = title || article.title;
    article.content = content || article.content;
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    await article.deleteOne();
    res.json({ message: "Article deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
