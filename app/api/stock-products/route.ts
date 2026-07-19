import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import StockProduct from "@/model/stockProductModel";

export async function GET() {
  await connect();
  const products = await StockProduct.find().sort({ createdAt: 1 }).lean();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  await connect();
  const { description, placeStored, packages, quantity, rate } = await request.json();
  if (!description?.trim() || !placeStored?.trim() || [packages, quantity, rate].some((value) => !Number.isFinite(Number(value)) || Number(value) < 0)) {
    return NextResponse.json({ error: "All product fields are required and numeric values cannot be negative." }, { status: 400 });
  }
  const product = await StockProduct.create({ description, placeStored, packages: Number(packages), quantity: Number(quantity), rate: Number(rate) });
  return NextResponse.json(product, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  await connect();
  const { id, description, placeStored, packages, quantity, rate } = await request.json();
  if (!id || !description?.trim() || !placeStored?.trim() || [packages, quantity, rate].some((value) => !Number.isFinite(Number(value)) || Number(value) < 0)) {
    return NextResponse.json({ error: "All product fields are required and numeric values cannot be negative." }, { status: 400 });
  }
  const product = await StockProduct.findByIdAndUpdate(id, { description, placeStored, packages: Number(packages), quantity: Number(quantity), rate: Number(rate) }, { new: true });
  if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });
  return NextResponse.json(product);
}

export async function DELETE(request: NextRequest) {
  await connect();
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Product id is required." }, { status: 400 });
  await StockProduct.findByIdAndDelete(id);
  return new NextResponse(null, { status: 204 });
}
