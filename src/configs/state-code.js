const stateCodes = [
    {
        "id": 1,
        "state": "Andhra Pradesh",
        "code": "AP"
    },
    {
        "id": 2,
        "state": "Arunachal Pradesh",
        "code": "AR"
    },
    {
        "id": 3,
        "state": "Assam",
        "code": "AS"
    },
    {
        "id": 4,
        "state": "Bihar",
        "code": "BR"
    },
    {
        "id": 5,
        "state": "Chhattisgarh",
        "code": "CG"
    },
    {
        "id": 6,
        "state": "Goa",
        "code": "GA"
    },
    {
        "id": 7,
        "state": "Gujarat",
        "code": "GJ"
    },
    {
        "id": 8,
        "state": "Haryana",
        "code": "HR"
    },
    {
        "id": 9,
        "state": "Himachal Pradesh",
        "code": "HP"
    },
    {
        "id": 10,
        "state": "Jammu and Kashmir",
        "code": "JK"
    },
    {
        "id": 11,
        "state": "Jharkhand",
        "code": "JH"
    },
    {
        "id": 12,
        "state": "Karnataka",
        "code": "KA"
    },
    {
        "id": 13,
        "state": "Kerala",
        "code": "KL"
    },
    {
        "id": 14,
        "state": "Madhya Pradesh",
        "code": "MP"
    },
    {
        "id": 15,
        "state": "Maharashtra",
        "code": "MH"
    },
    {
        "id": 16,
        "state": "Manipur",
        "code": "MN"
    },
    {
        "id": 17,
        "state": "Meghalaya",
        "code": "ML"
    },
    {
        "id": 18,
        "state": "Mizoram",
        "code": "MZ"
    },
    {
        "id": 19,
        "state": "Nagaland",
        "code": "NL"
    },
    {
        "id": 20,
        "state": "Orissa",
        "code": "OR"
    },
    {
        "id": 21,
        "state": "Punjab",
        "code": "PB"
    },
    {
        "id": 22,
        "state": "Rajasthan",
        "code": "RJ"
    },
    {
        "id": 23,
        "state": "Sikkim",
        "code": "SK"
    },
    {
        "id": 24,
        "state": "Tamil Nadu",
        "code": "TN"
    },
    {
        "id": 25,
        "state": "Tripura",
        "code": "TR"
    },
    {
        "id": 26,
        "state": "Uttarakhand",
        "code": "UK"
    },
    {
        "id": 27,
        "state": "Uttar Pradesh",
        "code": "UP"
    },
    {
        "id": 28,
        "state": "West Bengal",
        "code": "WB"
    },
    {
        "id": 29,
        "state": "Telangana",
        "code": "TS"
    },
    {
        "id": 30,
        "state": "Andaman and Nicobar Islands",
        "code": "AN"
    },
    {
        "id": 31,
        "state": "Chandigarh",
        "code": "CH"
    },
    {
        "id": 32,
        "state": "Dadra and Nagar Haveli",
        "code": "DH"
    },
    {
        "id": 33,
        "state": "Daman and Diu",
        "code": "DD"
    },
    {
        "id": 34,
        "state": "Delhi",
        "code": "DL"
    },
    {
        "id": 35,
        "state": "Lakshadweep",
        "code": "LD"
    },
    {
        "id": 36,
        "state": "Pondicherry",
        "code": "PY"
    },
    {
        "id": "",
        "state": "",
        "code": ""
    },
    {
        "id": "www.downloadexcelfiles.com",
        "state": "",
        "code": ""
    }
]

const getStateByCode = (code) => {
    return stateCodes.find(stateCode => stateCode.code === code)
}

const getCodeByState = (state) => {
    return stateCodes.find(stateCode => stateCode.state === state)
}

export { getStateByCode, getCodeByState };
