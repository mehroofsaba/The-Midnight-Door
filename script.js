"use strict";

/* =========================================================
   THE MIDNIGHT DOOR
   Interactive choose-your-own-adventure game
   ========================================================= */

/* -------------------- DOM REFERENCES -------------------- */

const elements = {
  introScreen: document.getElementById("introScreen"),
  storyScreen: document.getElementById("storyScreen"),
  endingScreen: document.getElementById("endingScreen"),

  beginButton: document.getElementById("beginButton"),
  restartButton: document.getElementById("restartButton"),
  brandHome: document.getElementById("brandHome"),

  chapterIndicator: document.getElementById("chapterIndicator"),
  sceneLabel: document.getElementById("sceneLabel"),
  sceneLocation: document.getElementById("sceneLocation"),
  sceneArt: document.getElementById("sceneArt"),
  sceneTitle: document.getElementById("sceneTitle"),
  sceneDescription: document.getElementById("sceneDescription"),
  memoryNote: document.getElementById("memoryNote"),
  choices: document.getElementById("choices"),
  consequenceHint: document.getElementById("consequenceHint"),

  progressFill: document.getElementById("progressFill"),
  progressText: document.getElementById("progressText"),
  stepText: document.getElementById("stepText"),
  discoveryList: document.getElementById("discoveryList"),
  backButton: document.getElementById("backButton"),

  endingSymbol: document.getElementById("endingSymbol"),
  endingEyebrow: document.getElementById("endingEyebrow"),
  endingTitle: document.getElementById("endingTitle"),
  endingDescription: document.getElementById("endingDescription"),
  statChoices: document.getElementById("statChoices"),
  statDiscoveries: document.getElementById("statDiscoveries"),
  statEnding: document.getElementById("statEnding"),
  endingJournalButton: document.getElementById("endingJournalButton"),

  journalToggle: document.getElementById("journalToggle"),
  journalOverlay: document.getElementById("journalOverlay"),
  journalClose: document.getElementById("journalClose"),
  journalCloseBottom: document.getElementById("journalCloseBottom"),
  journalEntries: document.getElementById("journalEntries"),
  downloadJournal: document.getElementById("downloadJournal"),

  toast: document.getElementById("toast"),
  starField: document.getElementById("starField"),
};

/* -------------------- STORY DATA -------------------- */

/*
Each scene has:
- id: unique scene identifier
- chapter: chapter label
- location: location shown above the scene
- title: scene title
- art: scene illustration theme
- description: the story text
- discovery: optional collectible discovery
- memory: optional highlighted story clue
- choices: available player actions
- ending: optional ending information

Each choice points to another scene using its target property.
*/

const STORY = {
  letter: {
    id: "letter",
    chapter: "CHAPTER I",
    location: "YOUR APARTMENT",
    title: "The Letter",
    art: "letter",
    description:
      "The clock on your wall reads 12:07 AM when three quiet knocks disturb the silence.\n\n" +
      "Outside your door lies a cream-coloured envelope. Your name is written across it in handwriting you haven't seen in twelve years.\n\n" +
      'Inside, you find an old brass key and a note: "If you want the truth, come home."',
    discovery: {
      id: "brass-key",
      title: "The Brass Key",
      description: "A cold brass key, engraved with a tiny crescent moon.",
    },
    memory:
      "You recognize the handwriting. It belongs to someone who disappeared.",
    choices: [
      {
        title: "Study the envelope",
        detail: "Search for a clue about who sent it.",
        target: "envelope",
      },
      {
        title: "Follow the address",
        detail: "Take the key and leave for the old house.",
        target: "journey",
      },
      {
        title: "Ignore the letter",
        detail: "Some secrets are better left buried.",
        target: "ignore",
      },
    ],
  },

  envelope: {
    id: "envelope",
    chapter: "CHAPTER I",
    location: "YOUR APARTMENT",
    title: "The Hidden Message",
    art: "letter",
    description:
      "You hold the envelope beneath your desk lamp. The paper smells faintly of rain and cedarwood.\n\n" +
      'Beneath the flap, someone has written a second message in almost invisible ink: "The house remembers what you forget."\n\n' +
      "There is a faint outline of a photograph pressed into the paper, but the photograph itself is missing.",
    discovery: {
      id: "hidden-message",
      title: "The Hidden Message",
      description: "A warning hidden beneath the envelope flap.",
    },
    memory: "The house remembers what you forget.",
    choices: [
      {
        title: "Take the key and go",
        detail: "The answer is waiting at the house.",
        target: "journey",
      },
      {
        title: "Look up the old address",
        detail: "Find out what happened to the house.",
        target: "records",
      },
    ],
  },

  records: {
    id: "records",
    chapter: "CHAPTER II",
    location: "THE CITY ARCHIVE",
    title: "A Name in the Records",
    art: "library",
    description:
      "The city archive should have closed hours ago, but the night attendant lets you inside after seeing the key.\n\n" +
      "In a dusty register, you find a record of the old house. It was abandoned after a fire twelve years ago. One resident was never found.\n\n" +
      "A handwritten note beside the record says that the house was locked from the inside.",
    discovery: {
      id: "archive-record",
      title: "The Archive Record",
      description:
        "An old record connecting the house to a mysterious disappearance.",
    },
    memory: "The house was locked from the inside.",
    choices: [
      {
        title: "Visit the house",
        detail: "You need to see the place yourself.",
        target: "journey",
      },
      {
        title: "Search for the missing resident",
        detail: "Find another record before you leave.",
        target: "missing",
      },
    ],
  },

  missing: {
    id: "missing",
    chapter: "CHAPTER II",
    location: "THE CITY ARCHIVE",
    title: "The Missing Resident",
    art: "library",
    description:
      "The register lists a single name beneath the missing-person notice. It is your own.\n\n" +
      "You read it three times. The dates don't make sense. According to the archive, you were reported missing twelve years ago, on the same night you remember leaving town.\n\n" +
      "There is no photograph attached. Only a small crescent moon drawn in the margin.",
    discovery: {
      id: "missing-record",
      title: "Your Missing-Person Record",
      description:
        "A record that places your name at the centre of the mystery.",
    },
    memory: "You were reported missing twelve years ago.",
    choices: [
      {
        title: "Go to the house",
        detail: "The key may finally explain everything.",
        target: "journey",
      },
      {
        title: "Return home",
        detail: "You need time to understand what you've found.",
        target: "return-home",
      },
    ],
  },

  journey: {
    id: "journey",
    chapter: "CHAPTER II",
    location: "THE OLD ROAD",
    title: "The Road Home",
    art: "forest",
    description:
      "The road out of town disappears beneath a canopy of black branches. There are no streetlights here, only the pale moon following you between the trees.\n\n" +
      "At the end of the road, the house stands exactly as you remember it. No fire damage. No broken windows. A single light burns upstairs.\n\n" +
      "The front door is waiting for your key.",
    discovery: {
      id: "old-road",
      title: "The Road Home",
      description: "A familiar road that seems untouched by the passing years.",
    },
    choices: [
      {
        title: "Enter through the front door",
        detail: "Use the brass key.",
        target: "foyer",
      },
      {
        title: "Walk around to the garden",
        detail: "Look for another way inside.",
        target: "garden",
      },
      {
        title: "Look through the upstairs window",
        detail: "Find out who left the light on.",
        target: "window",
      },
    ],
  },

  ignore: {
    id: "ignore",
    chapter: "CHAPTER I",
    location: "YOUR APARTMENT",
    title: "The Unopened Door",
    art: "mirror",
    description:
      "You put the envelope in a drawer and turn off the light.\n\n" +
      "For a while, there is only silence. Then comes a sound from the hallway: the slow scrape of a key turning in a lock.\n\n" +
      "Your apartment door opens by itself. The hallway beyond it is not your hallway. At the far end stands the old house, its upstairs window glowing.",
    discovery: null,
    memory: "Some invitations don't require an answer.",
    choices: [
      {
        title: "Step into the hallway",
        detail: "If the house has come to you, perhaps you should listen.",
        target: "foyer",
      },
      {
        title: "Lock yourself in",
        detail: "Refuse to follow the impossible.",
        target: "locked",
      },
    ],
  },

  locked: {
    id: "locked",
    chapter: "CHAPTER III",
    location: "YOUR APARTMENT",
    title: "Behind the Lock",
    art: "mirror",
    description:
      "You turn the lock twice and press your back against the door.\n\n" +
      "The footsteps outside stop. A voice you almost recognize whispers your name, then fades into the building's ordinary nighttime sounds.\n\n" +
      "In the morning, the envelope is gone. On your desk sits the brass key, although you never took it from the drawer.",
    choices: [
      {
        title: "Open the drawer",
        detail: "Find out what else has changed.",
        target: "letter",
      },
      {
        title: "Take the key and go",
        detail: "You can't ignore it forever.",
        target: "journey",
      },
    ],
  },

  garden: {
    id: "garden",
    chapter: "CHAPTER III",
    location: "THE OVERGROWN GARDEN",
    title: "The Garden Gate",
    art: "forest",
    description:
      "The garden is swallowed by ivy. At its centre stands an iron gate, half buried in the earth.\n\n" +
      "You remember a garden here, but not this gate. Its lock has the same crescent engraving as your key.\n\n" +
      "Behind it, something shifts in the darkness. You hear a familiar melody being hummed very softly.",
    discovery: {
      id: "garden-gate",
      title: "The Garden Gate",
      description: "An iron gate bearing the same crescent mark as the key.",
    },
    choices: [
      {
        title: "Unlock the garden gate",
        detail: "Find out where the melody is coming from.",
        target: "garden-beyond",
      },
      {
        title: "Return to the front door",
        detail: "The house is the reason you came.",
        target: "foyer",
      },
    ],
  },

  "garden-beyond": {
    id: "garden-beyond",
    chapter: "CHAPTER III",
    location: "THE GARDEN BEYOND",
    title: "The Familiar Melody",
    art: "forest",
    description:
      "The key turns without resistance. Beyond the gate, a narrow path leads to a stone bench beneath a dead tree.\n\n" +
      "Someone has carved two initials into the bench. Yours, and the initials of the person who disappeared.\n\n" +
      'A folded paper rests between the stones. It contains a simple sentence: "You promised you would remember."',
    discovery: {
      id: "carved-initials",
      title: "The Carved Initials",
      description: "Two sets of initials joined together beneath a dead tree.",
    },
    memory: "You promised you would remember.",
    choices: [
      {
        title: "Keep the note and enter the house",
        detail: "There is more to uncover inside.",
        target: "foyer",
      },
      {
        title: "Follow the melody",
        detail: "It leads farther into the garden.",
        target: "garden-ending",
      },
    ],
  },

  window: {
    id: "window",
    chapter: "CHAPTER III",
    location: "OUTSIDE THE HOUSE",
    title: "The Upstairs Window",
    art: "mirror",
    description:
      "You stand on a low stone wall and look through the upstairs window.\n\n" +
      "A room appears on the other side. It is your childhood bedroom, down to the cracked blue paint and the little wooden horse on the sill.\n\n" +
      "A figure stands with its back to you. When it turns, the glass reflects only your own face.",
    discovery: {
      id: "bedroom-window",
      title: "The Bedroom Window",
      description: "A window that reflects you instead of the room beyond it.",
    },
    choices: [
      {
        title: "Try the front door",
        detail: "The key may let you in.",
        target: "foyer",
      },
      {
        title: "Break the window",
        detail: "You need to see what is inside.",
        target: "broken-window",
      },
    ],
  },

  "broken-window": {
    id: "broken-window",
    chapter: "CHAPTER III",
    location: "THE UPSTAIRS ROOM",
    title: "Through the Glass",
    art: "mirror",
    description:
      "The glass breaks with a sound like a distant bell. You climb through and land in a room filled with cold moonlight.\n\n" +
      "On the desk is a photograph of you standing beside the missing resident. Your face is scratched out, but their face remains untouched.\n\n" +
      "A mirror across the room has been covered with a dark cloth.",
    discovery: {
      id: "old-photograph",
      title: "The Old Photograph",
      description:
        "A photograph that suggests you once knew the missing resident.",
    },
    memory: "Someone has tried to remove your face from the past.",
    choices: [
      {
        title: "Pull away the cloth",
        detail: "Look at what the mirror has been hiding.",
        target: "mirror",
      },
      {
        title: "Go downstairs",
        detail: "Search the rest of the house first.",
        target: "foyer",
      },
    ],
  },

  foyer: {
    id: "foyer",
    chapter: "CHAPTER III",
    location: "INSIDE THE OLD HOUSE",
    title: "The Foyer",
    art: "library",
    description:
      "The front door closes behind you without a sound. The air smells of rain, dust, and something faintly familiar.\n\n" +
      "Three doors face you. One leads to a library, one to a bedroom, and one to a room with a tall mirror.\n\n" +
      "The key in your hand has grown warm. From somewhere upstairs, a clock begins to chime.",
    discovery: {
      id: "the-foyer",
      title: "The Foyer",
      description: "A house that seems to have been waiting for your return.",
    },
    choices: [
      {
        title: "Explore the library",
        detail: "Look for the truth in the written record.",
        target: "library",
      },
      {
        title: "Enter the bedroom",
        detail: "See what you remember about your childhood.",
        target: "bedroom",
      },
      {
        title: "Approach the covered mirror",
        detail: "Face the thing you have avoided.",
        target: "mirror",
      },
    ],
  },

  library: {
    id: "library",
    chapter: "CHAPTER IV",
    location: "THE LIBRARY",
    title: "The Book That Knows",
    art: "library",
    description:
      "The library smells of cedar and old paper. Every book is blank except one, lying open beneath a pool of silver light.\n\n" +
      "Its pages describe your life in exact detail. Your first day at school. Your favourite hiding place. The last night you remember clearly.\n\n" +
      'The final page is empty, save for a line at the bottom: "The truth belongs to the one who chooses to read it."',
    discovery: {
      id: "blank-book",
      title: "The Book That Knows",
      description: "A book containing memories you thought were your own.",
    },
    memory: "The final page has been left for you.",
    choices: [
      {
        title: "Read the final page aloud",
        detail: "Let the house tell its story.",
        target: "read-truth",
      },
      {
        title: "Take the book to the mirror",
        detail: "The two objects may be connected.",
        target: "mirror",
      },
      {
        title: "Close the book",
        detail: "Not every truth must be uncovered.",
        target: "leave-house",
      },
    ],
  },

  bedroom: {
    id: "bedroom",
    chapter: "CHAPTER IV",
    location: "THE CHILDHOOD BEDROOM",
    title: "The Room You Forgot",
    art: "mirror",
    description:
      "The bedroom is preserved exactly as it was. A small wooden horse sits on the windowsill, and a paper star hangs above the bed.\n\n" +
      "You remember the night of the fire now: the smoke, the locked door, the hand reaching through the darkness. You escaped, but you left someone behind.\n\n" +
      "On the bedside table rests a small mirror, its surface hidden beneath a folded cloth.",
    discovery: {
      id: "childhood-memory",
      title: "A Childhood Memory",
      description: "A memory of the night everything changed.",
    },
    memory: "You escaped, but you left someone behind.",
    choices: [
      {
        title: "Uncover the mirror",
        detail: "You are ready to look.",
        target: "mirror",
      },
      {
        title: "Find the missing resident",
        detail: "Follow the memory to its source.",
        target: "missing-resident",
      },
    ],
  },

  mirror: {
    id: "mirror",
    chapter: "CHAPTER V",
    location: "THE MIRROR ROOM",
    title: "The Other Side",
    art: "mirror",
    description:
      "You pull away the cloth. The mirror does not reflect the room behind you.\n\n" +
      "It shows a second version of the house, lit by the warm light of a summer evening. In it, someone waits beside the staircase. They look exactly as you remember them, twelve years younger.\n\n" +
      "They press a hand against the glass. You do the same. For a moment, the surface gives beneath your fingers.",
    discovery: {
      id: "other-side",
      title: "The Other Side",
      description: "A reflection of the house as it existed before the fire.",
    },
    memory: "The mirror is not showing the past. It is showing a choice.",
    choices: [
      {
        title: "Reach through the mirror",
        detail: "Trust what you see on the other side.",
        target: "through-mirror",
      },
      {
        title: "Ask the reflection a question",
        detail: "Find out what happened that night.",
        target: "reflection",
      },
      {
        title: "Step away from the mirror",
        detail: "You are not ready to cross.",
        target: "leave-house",
      },
    ],
  },

  reflection: {
    id: "reflection",
    chapter: "CHAPTER V",
    location: "THE MIRROR ROOM",
    title: "The Answer",
    art: "mirror",
    description:
      "You ask what happened the night of the fire.\n\n" +
      "The figure on the other side lowers their hand. They explain that you were both trapped, and that someone had to open the only exit. You survived, but the memory was too painful to keep.\n\n" +
      '"You came back," they say. "That means you can finally choose what happens next."',
    discovery: {
      id: "the-answer",
      title: "The Answer",
      description: "The truth about the night of the fire.",
    },
    memory: "You can remember the past without living inside it.",
    choices: [
      {
        title: "Reach through the mirror",
        detail: "Choose to face what remains.",
        target: "through-mirror",
      },
      {
        title: "Leave the house",
        detail: "Accept the truth and return to your life.",
        target: "leave-house",
      },
    ],
  },

  "missing-resident": {
    id: "missing-resident",
    chapter: "CHAPTER V",
    location: "THE CHILDHOOD BEDROOM",
    title: "The Missing Resident",
    art: "mirror",
    description:
      "You say the missing resident's name aloud. The house grows still, as though it has been waiting to hear it.\n\n" +
      "A soft knock comes from inside the wardrobe. Behind its wooden door is a narrow staircase leading down to a room that shouldn't exist.\n\n" +
      "At the bottom stands the person from your memories. They are waiting, but they cannot cross the threshold without you.",
    discovery: {
      id: "hidden-staircase",
      title: "The Hidden Staircase",
      description:
        "A staircase that leads to a room outside the house's known floor plan.",
    },
    choices: [
      {
        title: "Follow them downstairs",
        detail: "You have come too far to turn back.",
        target: "through-mirror",
      },
      {
        title: "Return to the mirror room",
        detail: "Understand the house before choosing.",
        target: "mirror",
      },
    ],
  },

  "read-truth": {
    id: "read-truth",
    chapter: "CHAPTER V",
    location: "THE LIBRARY",
    title: "The Last Page",
    art: "library",
    description:
      "You read the words aloud. The blank page fills with handwriting, line by line.\n\n" +
      "It tells you that the house has kept the memories you abandoned. The person you lost is not a ghost trapped inside it; they are the part of your past you never allowed yourself to remember.\n\n" +
      'The final sentence appears: "You may keep the memory, or you may finally let it go."',
    discovery: {
      id: "last-page",
      title: "The Last Page",
      description: "The story the house has been keeping for twelve years.",
    },
    memory: "You may keep the memory, or you may finally let it go.",
    choices: [
      {
        title: "Keep the memory",
        detail: "Accept the truth and carry it forward.",
        target: "remember-ending",
      },
      {
        title: "Let the memory go",
        detail: "Choose a future that is not defined by the past.",
        target: "release-ending",
      },
    ],
  },

  "through-mirror": {
    id: "through-mirror",
    chapter: "CHAPTER VI",
    location: "BETWEEN TWO WORLDS",
    title: "Beyond the Glass",
    art: "mirror",
    description:
      "Your hand passes through the mirror as though it were cool water. The room on the other side is quiet, warm, and full of the scent of summer rain.\n\n" +
      "The person waiting for you offers their hand. You understand, without being told, that crossing will change the life you return to.\n\n" +
      "Behind you, the mirror begins to close. There is time for one final decision.",
    discovery: {
      id: "the-crossing",
      title: "The Crossing",
      description:
        "You stepped beyond the reflection and found a second version of the house.",
    },
    choices: [
      {
        title: "Take their hand",
        detail: "Enter the life you thought you had lost.",
        target: "together-ending",
      },
      {
        title: "Return through the mirror",
        detail: "Carry the truth back to the world you know.",
        target: "remember-ending",
      },
    ],
  },

  "return-home": {
    id: "return-home",
    chapter: "CHAPTER VI",
    location: "THE OLD ROAD",
    title: "The Long Way Back",
    art: "forest",
    description:
      "You leave the archive and walk toward home. The streets are ordinary again, full of traffic lights and closed shops.\n\n" +
      "The brass key rests in your pocket. You know the house will still be there when you are ready, but you no longer feel that you must answer every question tonight.\n\n" +
      "For the first time in years, you can decide what tomorrow looks like.",
    choices: [
      {
        title: "Keep the key",
        detail: "Remember that you can return when you choose.",
        target: "remember-ending",
      },
      {
        title: "Leave the key behind",
        detail: "Let the past remain where it belongs.",
        target: "release-ending",
      },
    ],
  },

  "leave-house": {
    id: "leave-house",
    chapter: "CHAPTER VI",
    location: "THE FRONT DOOR",
    title: "The Choice to Leave",
    art: "forest",
    description:
      "You step out into the night. The door closes behind you, and the house settles into silence.\n\n" +
      "Nothing chases you. No voice calls your name. The road ahead is empty, but it no longer feels threatening.\n\n" +
      "You carry the truth with you, even if you are not ready to carry every memory.",
    choices: [
      {
        title: "Remember what happened",
        detail: "Accept the past as part of your story.",
        target: "remember-ending",
      },
      {
        title: "Let the past rest",
        detail: "Give yourself permission to move on.",
        target: "release-ending",
      },
    ],
  },

  "garden-ending": {
    id: "garden-ending",
    chapter: "EPILOGUE",
    location: "THE GARDEN",
    title: "The Quiet Garden",
    art: "forest",
    ending: {
      id: "03",
      symbol: "☾",
      eyebrow: "ENDING III · THE QUIET PATH",
      title: "Some Things Can Rest",
      description:
        "You follow the melody until it dissolves into the wind.\n\n" +
        "The garden becomes quiet. The house stands behind you, its windows dark at last. You do not find every answer, but you discover that you can live without them.\n\n" +
        "Years later, you will remember the garden as the place where you stopped running from a question that no longer needed an answer.",
    },
  },

  "remember-ending": {
    id: "remember-ending",
    chapter: "EPILOGUE",
    location: "THE OLD HOUSE",
    title: "What We Keep",
    art: "mirror",
    ending: {
      id: "01",
      symbol: "✦",
      eyebrow: "ENDING I · THE KEEPER",
      title: "What We Keep",
      description:
        "You choose to remember. The house begins to change around you, its shadows softening into the shapes of ordinary rooms.\n\n" +
        "The person you lost is no longer waiting behind the glass. Their memory comes with you: imperfect, painful, and real.\n\n" +
        "When morning arrives, you leave the house carrying the brass key. Not as a promise to return, but as proof that you were brave enough to look.",
    },
  },

  "release-ending": {
    id: "release-ending",
    chapter: "EPILOGUE",
    location: "THE OLD ROAD",
    title: "The Door Closes",
    art: "forest",
    ending: {
      id: "02",
      symbol: "◇",
      eyebrow: "ENDING II · THE RELEASE",
      title: "The Door Closes",
      description:
        "You set the key on the doorstep and walk toward the first light of dawn.\n\n" +
        "The house remains behind you, but its pull has faded. You cannot change what happened, and you no longer need to revisit it to prove that it mattered.\n\n" +
        "Some doors close not because the story was unimportant, but because you are finally ready to write another one.",
    },
  },

  "together-ending": {
    id: "together-ending",
    chapter: "EPILOGUE",
    location: "THE OTHER SIDE",
    title: "A Different Morning",
    art: "mirror",
    ending: {
      id: "04",
      symbol: "∞",
      eyebrow: "ENDING IV · BEYOND THE GLASS",
      title: "A Different Morning",
      description:
        "You take their hand. The mirror closes behind you, and the house is filled with the sound of a clock striking seven.\n\n" +
        "Outside, the garden is green again. The air smells of rain, and the world feels unfamiliar in the way a forgotten dream does.\n\n" +
        "You do not know what waits beyond this morning. For once, you decide that not knowing is enough.",
    },
  },
};

/* -------------------- GAME STATE -------------------- */

const state = {
  started: false,
  currentScene: null,
  previousScenes: [],
  visitedScenes: new Set(),
  discoveries: new Map(),
  journal: [],
  choiceCount: 0,
  endingCount: 0,
  currentEnding: null,
};

const MAX_PROGRESS = 8;

const ENDING_IDS = new Set([
  "garden-ending",
  "remember-ending",
  "release-ending",
  "together-ending",
]);

/* -------------------- GENERAL UTILITIES -------------------- */

function getScene(sceneId) {
  const scene = STORY[sceneId];

  if (!scene) {
    console.error("Unknown story scene:", sceneId);
    showToast("That path could not be found. Please restart the story.");
    return null;
  }

  return scene;
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined && text !== null) {
    element.textContent = text;
  }

  return element;
}

function renderParagraphs(container, text) {
  container.replaceChildren();

  const paragraphs = text.split("\n\n");

  paragraphs.forEach((paragraph) => {
    const p = createElement("p", "", paragraph);
    container.appendChild(p);
  });
}

function setScreen(screenName) {
  elements.introScreen.classList.toggle("hidden", screenName !== "intro");

  elements.storyScreen.classList.toggle("hidden", screenName !== "story");

  elements.endingScreen.classList.toggle("hidden", screenName !== "ending");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");

  if (showToast.timeoutId) {
    window.clearTimeout(showToast.timeoutId);
  }

  showToast.timeoutId = window.setTimeout(() => {
    elements.toast.classList.remove("visible");
  }, 2600);
}

/* -------------------- BACKGROUND STARS -------------------- */

function createStars() {
  const fragment = document.createDocumentFragment();
  const starCount = window.innerWidth < 600 ? 55 : 90;

  for (let i = 0; i < starCount; i += 1) {
    const star = createElement("span", "star");

    const size = Math.random() > 0.8 ? 3 : 2;
    const opacity = (0.2 + Math.random() * 0.5).toFixed(2);
    const duration = (2.5 + Math.random() * 4).toFixed(2);
    const delay = (Math.random() * -5).toFixed(2);

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.setProperty("--star-opacity", opacity);
    star.style.setProperty("--twinkle-duration", `${duration}s`);
    star.style.setProperty("--twinkle-delay", `${delay}s`);

    fragment.appendChild(star);
  }

  elements.starField.replaceChildren(fragment);
}

/* -------------------- JOURNAL -------------------- */

function addJournalEntry(scene, selectedChoice) {
  const entry = {
    step: state.journal.length + 1,
    sceneTitle: scene.title,
    location: scene.location,
    description: scene.description,
    choice: selectedChoice || "The story began.",
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  state.journal.push(entry);
  renderJournal();
}

function renderJournal() {
  elements.journalEntries.replaceChildren();

  if (state.journal.length === 0) {
    const empty = createElement(
      "p",
      "journal-empty",
      "Your story hasn't begun yet.",
    );

    elements.journalEntries.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();

  [...state.journal].reverse().forEach((entry) => {
    const article = createElement("article", "journal-entry");

    const heading = createElement("div", "journal-entry-heading");

    heading.appendChild(
      createElement(
        "span",
        "journal-entry-step",
        `ENTRY ${String(entry.step).padStart(2, "0")}`,
      ),
    );

    heading.appendChild(
      createElement("span", "journal-entry-time", entry.time),
    );

    const title = createElement("h3", "", entry.sceneTitle);
    const location = createElement(
      "p",
      "",
      `${entry.location} · ${entry.choice}`,
    );

    const description = createElement(
      "p",
      "",
      entry.description.replace(/\n\n/g, " "),
    );

    article.append(heading, title, location, description);
    fragment.appendChild(article);
  });

  elements.journalEntries.appendChild(fragment);
}

function openJournal() {
  renderJournal();
  elements.journalOverlay.classList.remove("hidden");
  elements.journalClose.focus();
}

function closeJournal() {
  elements.journalOverlay.classList.add("hidden");
  elements.journalToggle.focus();
}

function exportJournal() {
  if (state.journal.length === 0) {
    showToast("Begin your story before exporting your journal.");
    return;
  }

  const lines = [
    "THE MIDNIGHT DOOR",
    "Your Field Notes",
    "================",
    "",
    `Exported: ${new Date().toLocaleString()}`,
    `Choices made: ${state.choiceCount}`,
    `Discoveries: ${state.discoveries.size}`,
    "",
  ];

  state.journal.forEach((entry) => {
    lines.push(
      `ENTRY ${String(entry.step).padStart(2, "0")} — ${entry.sceneTitle}`,
      `Location: ${entry.location}`,
      `Decision: ${entry.choice}`,
      "",
      entry.description,
      "",
      "----------------------------------------",
      "",
    );
  });

  if (state.currentEnding) {
    const ending = STORY[state.currentEnding];

    lines.push(
      "ENDING REACHED",
      ending.ending.title,
      "",
      ending.ending.description,
      "",
    );
  }

  const file = new Blob([lines.join("\n")], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(file);
  const link = createElement("a");

  link.href = url;
  link.download = "the-midnight-door-journal.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);

  showToast("Your journal has been exported.");
}

/* -------------------- DISCOVERIES -------------------- */

function registerDiscovery(discovery) {
  if (!discovery || state.discoveries.has(discovery.id)) {
    return;
  }

  state.discoveries.set(discovery.id, discovery);
  renderDiscoveries();

  showToast(`Discovered: ${discovery.title}`);
}

function renderDiscoveries() {
  elements.discoveryList.replaceChildren();

  if (state.discoveries.size === 0) {
    elements.discoveryList.appendChild(
      createElement(
        "p",
        "empty-discoveries",
        "Your discoveries will appear here.",
      ),
    );

    return;
  }

  const fragment = document.createDocumentFragment();

  state.discoveries.forEach((discovery) => {
    const item = createElement("div", "discovery-item");

    item.appendChild(createElement("span", "discovery-icon", "✦"));

    item.appendChild(createElement("span", "", discovery.title));

    item.title = discovery.description;
    fragment.appendChild(item);
  });

  elements.discoveryList.appendChild(fragment);
}

/* -------------------- PROGRESS TRACKING -------------------- */

function calculateProgress() {
  const normalScenes = [...state.visitedScenes].filter(
    (sceneId) => !ENDING_IDS.has(sceneId),
  );

  const percentage = Math.min(
    100,
    Math.round((normalScenes.length / MAX_PROGRESS) * 100),
  );

  elements.progressFill.style.width = `${percentage}%`;
  elements.progressText.textContent = `${percentage}% explored`;
  elements.stepText.textContent = String(state.visitedScenes.size).padStart(
    2,
    "0",
  );
}

/* -------------------- CHOICE RENDERING -------------------- */

function renderChoices(scene) {
  elements.choices.replaceChildren();

  if (!Array.isArray(scene.choices) || scene.choices.length === 0) {
    elements.choices.appendChild(
      createElement(
        "p",
        "empty-discoveries",
        "There are no choices available in this scene.",
      ),
    );

    return;
  }

  const fragment = document.createDocumentFragment();

  scene.choices.forEach((choice, index) => {
    const button = createElement("button", "choice-button");
    button.type = "button";

    const number = createElement(
      "span",
      "choice-number",
      String(index + 1).padStart(2, "0"),
    );

    const copy = createElement("span", "choice-copy");

    const title = createElement("span", "choice-title", choice.title);

    const detail = createElement("span", "choice-detail", choice.detail);

    const arrow = createElement("span", "choice-arrow", "→");
    arrow.setAttribute("aria-hidden", "true");

    copy.append(title, detail);
    button.append(number, copy, arrow);

    button.addEventListener("click", () => {
      chooseOption(choice);
    });

    fragment.appendChild(button);
  });

  elements.choices.appendChild(fragment);
}

/* -------------------- SCENE RENDERING -------------------- */

function renderScene(sceneId, options = {}) {
  const scene = getScene(sceneId);

  if (!scene) {
    return;
  }

  state.currentScene = sceneId;
  state.visitedScenes.add(sceneId);

  elements.chapterIndicator.textContent = scene.chapter;
  elements.sceneLabel.textContent = scene.chapter;
  elements.sceneLocation.textContent = scene.location;
  elements.sceneTitle.textContent = scene.title;

  elements.sceneArt.dataset.art = scene.art || "letter";

  renderParagraphs(elements.sceneDescription, scene.description);

  if (scene.memory) {
    elements.memoryNote.textContent = scene.memory;
    elements.memoryNote.classList.remove("hidden");
  } else {
    elements.memoryNote.textContent = "";
    elements.memoryNote.classList.add("hidden");
  }

  if (scene.discovery) {
    registerDiscovery(scene.discovery);
  }

  renderChoices(scene);
  calculateProgress();

  elements.backButton.disabled = state.previousScenes.length === 0;
  elements.backButton.style.visibility =
    state.previousScenes.length === 0 ? "hidden" : "visible";

  elements.consequenceHint.textContent =
    state.choiceCount === 0
      ? "Every choice leaves a trace."
      : `${state.choiceCount} decision${state.choiceCount === 1 ? "" : "s"} made so far.`;

  setScreen("story");

  if (options.record !== false) {
    addJournalEntry(scene, options.choice || "Entered this scene.");
  }
}

/* -------------------- PLAYER CHOICES -------------------- */

function chooseOption(choice) {
  if (!choice || !choice.target) {
    showToast("This choice is not available.");
    return;
  }

  const destination = getScene(choice.target);

  if (!destination) {
    return;
  }

  const current = getScene(state.currentScene);

  if (current) {
    state.previousScenes.push({
      sceneId: state.currentScene,
      choiceCount: state.choiceCount,
    });
  }

  state.choiceCount += 1;

  addJournalEntry(current || destination, choice.title);

  if (destination.ending) {
    state.currentEnding = choice.target;
    state.endingCount += 1;
    renderEnding(destination);
    return;
  }

  renderScene(choice.target, {
    record: true,
    choice: choice.title,
  });
}

/* -------------------- ENDING RENDERING -------------------- */

function renderEnding(scene) {
  const ending = scene.ending;

  if (!ending) {
    showToast("This ending is missing its story details.");
    return;
  }

  state.currentEnding = scene.id;

  elements.chapterIndicator.textContent = scene.chapter;
  elements.endingSymbol.textContent = ending.symbol;
  elements.endingEyebrow.textContent = ending.eyebrow;
  elements.endingTitle.textContent = ending.title;

  renderParagraphs(elements.endingDescription, ending.description);

  elements.statChoices.textContent = String(state.choiceCount);
  elements.statDiscoveries.textContent = String(state.discoveries.size);
  elements.statEnding.textContent = ending.id;

  addJournalEntry(scene, `Ending reached: ${ending.title}`);

  setScreen("ending");
}

/* -------------------- NAVIGATION -------------------- */

function startGame() {
  resetState();
  state.started = true;

  renderScene("letter", {
    record: true,
    choice: "The adventure began.",
  });
}

function goBack() {
  if (state.previousScenes.length === 0) {
    return;
  }

  const previous = state.previousScenes.pop();

  state.choiceCount = previous.choiceCount;
  state.currentEnding = null;

  renderScene(previous.sceneId, {
    record: true,
    choice: "Returned to a previous scene.",
  });
}

function returnToIntro() {
  const shouldConfirm =
    state.started && state.journal.length > 1 && !state.currentEnding;

  if (shouldConfirm) {
    const confirmed = window.confirm(
      "Return to the beginning? Your current story progress will be cleared.",
    );

    if (!confirmed) {
      return;
    }
  }

  resetState();
  setScreen("intro");
  elements.chapterIndicator.textContent = "PROLOGUE";
}

function resetState() {
  state.started = false;
  state.currentScene = null;
  state.previousScenes = [];
  state.visitedScenes = new Set();
  state.discoveries = new Map();
  state.journal = [];
  state.choiceCount = 0;
  state.endingCount = 0;
  state.currentEnding = null;

  elements.progressFill.style.width = "0%";
  elements.progressText.textContent = "0% explored";
  elements.stepText.textContent = "00";

  elements.discoveryList.replaceChildren();
  elements.discoveryList.appendChild(
    createElement(
      "p",
      "empty-discoveries",
      "Your discoveries will appear here.",
    ),
  );

  elements.journalEntries.replaceChildren();
  elements.journalEntries.appendChild(
    createElement("p", "journal-empty", "Your story hasn't begun yet."),
  );

  elements.memoryNote.textContent = "";
  elements.memoryNote.classList.add("hidden");
  elements.choices.replaceChildren();
  elements.journalOverlay.classList.add("hidden");
}

/* -------------------- EVENT LISTENERS -------------------- */

elements.beginButton.addEventListener("click", startGame);

elements.restartButton.addEventListener("click", () => {
  resetState();
  startGame();
});

elements.brandHome.addEventListener("click", (event) => {
  event.preventDefault();
  returnToIntro();
});

elements.backButton.addEventListener("click", goBack);

elements.journalToggle.addEventListener("click", openJournal);
elements.endingJournalButton.addEventListener("click", openJournal);

elements.journalClose.addEventListener("click", closeJournal);
elements.journalCloseBottom.addEventListener("click", closeJournal);

elements.downloadJournal.addEventListener("click", exportJournal);

elements.journalOverlay.addEventListener("click", (event) => {
  if (event.target === elements.journalOverlay) {
    closeJournal();
  }
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    !elements.journalOverlay.classList.contains("hidden")
  ) {
    closeJournal();
  }
});

/* -------------------- INITIALIZATION -------------------- */

function initializeGame() {
  createStars();
  resetState();
  setScreen("intro");
}

initializeGame();
