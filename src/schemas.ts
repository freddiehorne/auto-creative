import { z } from "zod";
import { Person } from "./types";

export const paramsSchema = z.object({
	search: z.string(),
	role: z.enum(["ANY", "STUDENT", "EMPLOYEE"]),
	employeeType: z.enum(["ANY", "FULL_TIME", "PART_TIME"]),
	offset: z.number(),
	pageSize: z.number(),
	sortDirection: z.enum(["asc", "desc"]).optional().nullable(),
	sort: z.custom<keyof Person>(),
});

export const filterSchema = paramsSchema.pick({
	search: true,
	role: true,
	employeeType: true,
});

export const tableSchema = paramsSchema.pick({ pageSize: true });
