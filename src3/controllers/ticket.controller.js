import { Ticket } from "../models/index.js";

export const ticketController = {
  async create(req, res, next) {
    try {
      const body = req.body;
      if (!body) {
        throw new Error("Ticket data is required");
      }

      const ticket = new Ticket(body);
      await ticket.save();

      res.status(201).json(ticket);
    } catch (error) {
      if (error.code === 11000) {
        error.message = "Ticket already exists";
        error.code = 400;
        res.status(400).json(error);
        return;
      }
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const query = req.query;

      const category = query.category || "";
      const status = query.status || "";
      const page = query.page || 1;
      const limit = query.limit || 10;
      const skip = (page - 1) * limit;

      const filter = {};
      if (category) filter.category = category;
      if (status) filter.status = status;

      const tickets = await Ticket.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      const totalCount = await Ticket.countDocuments(filter);
      const totalPages = Math.ceil(totalCount / limit);

      res.status(200).json({
        data: tickets,
        pageInfo: {
          page,
          limit,
          total: totalCount,
          totalPages,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;

      const ticket = await Ticket.findById(id);
      if (!ticket) {
        throw new Error("Ticket not found");
      }

      res.status(200).json(ticket);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const body = req.body;

      const ticket = await Ticket.findByIdAndUpdate(id, body, {
        new: true, 
      });

      if (!ticket) {
        throw new Error("Ticket not found");
      }

      res.status(200).json(ticket);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const ticket = await Ticket.findById(id);
      if (!ticket) {
        throw new Error("Ticket not found");
      }

      if (ticket.soldQuantity > 0) {
        throw new Error("Ticket cannot be deleted, because it has been sold");
      }

      await Ticket.findByIdAndDelete(id);
      res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};
