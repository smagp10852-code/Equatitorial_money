import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      name,
      email,
      mobile,
      city,
      amount,
      address,
      from,
      to,
      rate,
      type
    } = body;

    /* =========================
       VALIDATION
    ========================== */

    if (
      !name ||
      !email ||
      !mobile ||
      !city ||
      !amount ||
      !address ||
      !from ||
      !to ||
      !rate
    ) {

      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );

    }

    /* =========================
       FORMAT RATE
    ========================== */

    const formattedRate = Number(rate).toFixed(3);

    /* =========================
       CALCULATE CONVERTED VALUE
    ========================== */

    const convertedAmount =
      (Number(amount) * Number(formattedRate)).toFixed(2);

    /* =========================
       TRANSACTION LABEL
    ========================== */

    const transactionLabel =
      type === "buy"
        ? "Buy Foreign Currency"
        : "Sell Foreign Currency";

    /* =========================
       SAVE TO GOOGLE SHEET
    ========================== */

    try {

      await fetch(
        "https://script.google.com/macros/s/AKfycbwnpa1dnqbH_CUTnHzQYT-nFjVSTx-RRHev5p34rV7ULun_ncG_5fv6Udd5GRQT3Zml/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            mobile,
            city,
            amount,
            address,
            from,
            to,
            rate: formattedRate,
            total: convertedAmount,
            type: transactionLabel
          })
        }
      );

    } catch (sheetError) {

      console.error("Google Sheet error:", sheetError);

    }

    /* =========================
       WHATSAPP MESSAGE
    ========================== */

    const message = `💱 Currency Exchange Request

Name: ${name}
Email: ${email}
Mobile: ${mobile}
City: ${city}

Transaction: ${transactionLabel}

From: ${from}
To: ${to}

Forex Amount: ${amount} ${type === "buy" ? to : from}
Rate: ${formattedRate}

Converted Amount: ₹${convertedAmount}

Address:
${address}
`;

    const whatsappLink =
      `https://wa.me/918981139988?text=${encodeURIComponent(message)}`;

    return NextResponse.json({
      success: true,
      whatsapp: whatsappLink
    });

  } catch (error) {

    console.error("Exchange API Error:", error);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );

  }

}