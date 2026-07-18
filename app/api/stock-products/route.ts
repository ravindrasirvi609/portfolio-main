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
  const { description, placeStored } = await request.json();
  if (!description?.trim() || !placeStored?.trim()) {
    return NextResponse.json({ error: "Description and place stored are required." }, { status: 400 });
  }
  const product = await StockProduct.create({ description, placeStored });
  return NextResponse.json(product, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  await connect();
  const { id, description, placeStored } = await request.json();
  if (!id || !description?.trim() || !placeStored?.trim()) {
    return NextResponse.json({ error: "Description and place stored are required." }, { status: 400 });
  }
  const product = await StockProduct.findByIdAndUpdate(id, { description, placeStored }, { new: true });
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
