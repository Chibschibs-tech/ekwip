// If this file exists, we'll replace it with an empty implementation
export async function GET() {
  return new Response(JSON.stringify({ message: "API route replaced" }), {
    headers: { "content-type": "application/json" },
  })
}
