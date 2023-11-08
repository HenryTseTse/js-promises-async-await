const favNum = 8;
const URL = "http://numbersapi.com";

// 1.
async function getFact() {
    let res = await axios.get(`${URL}/${favNum}?json`);
    console.log(res.data.text);
}
getFact();

// 2.
const favNums = [2, 8, 24];
async function getFacts() {
    let res = await axios.get(`${URL}/${favNums}?json`);
    console.log(res.data)
}
getFacts();

// 3.
async function get4Facts() {
    let fourPromises = []
    for (let i = 1; i< 5; i++) {
        fourPromises.push(axios.get(`${URL}/${favNum}?json`));
    }
    let facts = await Promise.all(fourPromises);
    facts.forEach(data => {
        $('#facts-container').append(`<p>${data.data.text}</p>`);
    });
}
get4Facts();