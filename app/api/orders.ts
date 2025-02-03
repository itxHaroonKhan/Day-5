
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, phone, address, product, quantity } = req.body;

    if (!name || !email || !phone || !address || !product || !quantity) {
      return res.status(400).json({ message: "⚠ تمام فیلڈز ضروری ہیں۔" });
    }

    // آرڈر کا ڈیٹا کنسول میں پرنٹ کریں (بعد میں اسے ڈیٹا بیس میں سیو کریں)
    console.log("🛒 نیا آرڈر موصول ہوا:", req.body);

    return res.status(200).json({ message: "✅ آرڈر کامیابی سے موصول ہو گیا!" });
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).json({ message: `❌ ${req.method} میتھڈ الاؤ نہیں ہے۔` });
}
