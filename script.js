const commandSearch = document.getElementById("commandSearch");
const categoryButtons = document.querySelectorAll(".category-btn");
const commandSections = document.querySelectorAll(".command-section");
const commandCards = document.querySelectorAll(".command-card");
const noResults = document.getElementById("noResults");
const toast = document.getElementById("toast");

let activeCategory = "all";

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

function filterCommands() {
  const query = commandSearch.value.trim().toLowerCase();
  let visibleCards = 0;

  commandSections.forEach(section => {
    const sectionCategory = section.dataset.section;
    const categoryMatches =
      activeCategory === "all" || activeCategory === sectionCategory;

    let sectionVisible = false;

    section.querySelectorAll(".command-card").forEach(card => {
      const name = card.dataset.name.toLowerCase();
      const text = card.textContent.toLowerCase();
      const searchMatches = !query || name.includes(query) || text.includes(query);
      const visible = categoryMatches && searchMatches;

      card.classList.toggle("hidden", !visible);

      if (visible) {
        sectionVisible = true;
        visibleCards++;
      }
    });

    section.classList.toggle("hidden", !sectionVisible);
  });

  noResults.classList.toggle("show", visibleCards === 0 && query !== "");
}

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;

    categoryButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    filterCommands();
    document.getElementById("commands").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

commandSearch.addEventListener("input", filterCommands);

document.querySelectorAll("#inviteBtn, #inviteBtn2").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();

    // ضع رابط دعوة البوت الحقيقي هنا.
    // مثال:
    // window.location.href = "https://discord.com/oauth2/authorize?...";

    showToast("ضع رابط دعوة Evi-Chan في script.js");
  });
});

async function loadStats() {
  try {
    const response = await fetch("/api/stats");
    const data = await response.json();

    document.getElementById("serverCount").textContent = data.servers ?? 0;
    document.getElementById("commandCount").textContent =
      `${data.commands ?? 0}+`;
  } catch {
    // Keep default values if the API is unavailable.
  }
}

loadStats();
filterCommands();