package decoder

import (
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/yomorun/y3-codec-golang"
)

// func main() {
// 	http.HandleFunc("/", Decoder)
// 	log.Fatal(http.ListenAndServe(":8081", nil))
// }

func Decoder(w http.ResponseWriter, r *http.Request) {
	var v interface{}
	var err error

	// parse request
	dcdr := json.NewDecoder(r.Body)
	obj := make(map[string]interface{})
	err = dcdr.Decode(&obj)
	if err != nil {
		fmt.Fprintf(w, `{ "error": "%v" }`, err)
		return
	}
	fmt.Printf("[debug] request:\t%v\n", obj)

	// convert str to byte array
	hexstr := obj["bytes"].(string)
	hexstr = strings.Replace(hexstr, "0x", "", -1)
	hexstr = strings.Replace(hexstr, ",", "", -1)
	hexstr = strings.Replace(hexstr, " ", "", -1)
	data, err := hex.DecodeString(hexstr)
	if err != nil {
		fmt.Fprintf(w, `{ "error": "%v" }`, err)
		return
	}

	// main dish
	res, _, _, err := y3.DecodePrimitivePacket(data)
	if err != nil {
		fmt.Fprintf(w, `{ "error": "%v" }`, err)
		return
	}

	// reference: y3-codec-golang/primitive_packet.go
	switch t := obj["interpret_as"]; t {
	case "int32":
		v, err = res.ToInt32()
	case "uint32":
		v, err = res.ToUInt32()
	case "int64":
		v, err = res.ToInt64()
	case "uint64":
		v, err = res.ToUInt64()
	case "float32":
		v, err = res.ToFloat32()
	case "float64":
		v, err = res.ToFloat64()
	case "bool":
		v, err = res.ToBool()
	case "string":
		v, err = res.ToUTF8String()
	}
	if err != nil {
		fmt.Fprintf(w, `{ "error": "%v" }`, err)
		return
	}
	fmt.Printf("[debug] response:\t'%v'\n", v)

	// success
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, `{ "result": "%v" }`, v)
}
