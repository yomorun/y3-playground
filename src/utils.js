export async function req(input, padded, type) {
    let res;
	try {
        res = await fetch("/api/decoder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bytes: input,
	            padded: padded,
	            interpret_as: type
            })
        });
        if (!res) {
            console.error("No response");
        } else if (!res.ok) {
            console.error("HTTP-Error: " + res.status);
        } else {
            const json = await res.json()
            return json
        }
	} catch (err) {
        console.error(err.message);
        return { result: "an error has occurred" };
	}
}
