export default function formatDate(date) {
    const dateArray = date.split("T")[0].split("-");
    console.log(date.split("T")[0].split("-"));

    let month;
    switch (dateArray[1]) {
        case "1":
            month = "January";
            break;
        case "10":
            month = "October";
            break;
        case "11":
            month = "November";
            break;
    }
    console.log(month);
    return `${dateArray[2]} ${month} ${dateArray[0]}`;
}

