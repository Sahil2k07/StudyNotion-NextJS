import InitializeDatabase, { AppDataSource } from "@/database/dataSource";
import { Category } from "@/database/entity/Category.entity";
import { NEXT_AUTH } from "@/services/NextAuth";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, description = null } = await req.json();

  const session = await getServerSession(NEXT_AUTH);

  if (!session || session?.user?.accountType !== "Admin") {
    return NextResponse.json({
      success: false,
      message: "You are not Authorized for this route",
    });
  }

  await InitializeDatabase();

  const existingCategory = await AppDataSource.getRepository(Category).findOne({
    where: { name },
  });

  if (existingCategory) {
    return NextResponse.json({
      success: false,
      message: "Category already exists",
    });
  }

  const newCategory = new Category();
  newCategory.name = name;
  newCategory.description = description;

  try {
    await AppDataSource.getRepository(Category).save(newCategory);
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error while creating new category",
    });
  }

  return NextResponse.json({
    success: true,
    message: "Category created successfully",
    category: newCategory,
  });
}

export async function GET() {
  await InitializeDatabase();

  const categories = await AppDataSource.getRepository(Category).find({
    relations: ["courses"],
  });

  return NextResponse.json({
    success: true,
    message: "Got all Categories successfully",
    categories: categories,
  });
}
