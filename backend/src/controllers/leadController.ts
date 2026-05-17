import { Request, Response } from "express";
import Lead from "../models/Lead";

export const createLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead = await Lead.create(req.body);

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create lead",
    });
  }
};

export const getLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      page = "1",
      status,
      source,
      search,
      sort,
    } = req.query;

    const limit = 10;
    const skip = (Number(page) - 1) * limit;

    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (source) {
      query.source = source;
    }

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const sortOption =
      sort === "oldest"
        ? { createdAt: 1 as const }
        : { createdAt: -1 as const };

    const leads = await Lead.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Lead.countDocuments(query);

    res.status(200).json({
      data: leads,
      pagination: {
        total,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch leads",
    });
  }
};

export const getLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch lead",
    });
  }
};

export const updateLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update lead",
    });
  }
};

export const deleteLead = async (
  req: Request,
  res: Response
) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Lead deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete lead",
    });
  }
};