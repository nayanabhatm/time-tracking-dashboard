let dailyNavBarItem = document.getElementsByClassName("nav-item")[0];
parseJSONData(dailyNavBarItem.innerText);

async function parseJSONData(frequency) {
  const result = await fetch("data.json");
  const jsonData = await result.json();

  for (var i = 0; i < jsonData.length; i++) {
    const {
      title,
      timeframes: { daily, monthly, weekly },
    } = jsonData[i];

    var itemContent = document.getElementsByClassName("item-content")[i];
    if (frequency == "Daily") {
      itemContent.getElementsByTagName("h1")[0].innerText =
        daily.current + "hrs";
      itemContent.getElementsByTagName("span")[0].innerText =
        daily.previous + "hrs";
    } else if (frequency == "Monthly") {
      itemContent.getElementsByTagName("h1")[0].innerText =
        monthly.current + "hrs";
      itemContent.getElementsByTagName("span")[0].innerText =
        monthly.previous + "hrs";
    } else if (frequency == "Weekly") {
      itemContent.getElementsByTagName("h1")[0].innerText =
        weekly.current + "hrs";
      itemContent.getElementsByTagName("span")[0].innerText =
        weekly.previous + "hrs";
    }

    Object.values(document.getElementsByClassName("nav-item")).forEach((item) =>
      item.innerText == frequency
        ? (item.style.color = "white")
        : (item.style.color = null)
    );
  }
}

let navBarItems = Object.values(document.getElementsByClassName("nav-item"));
navBarItems.forEach((element) => {
  element.addEventListener("click", function () {
    parseJSONData(element.innerText);
  });
});
