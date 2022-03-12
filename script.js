import { categories } from "./categories.js"

const SUCCESS_COLOR = "#32CD32";
const ERROR_COLOR = "#FF726F";

const title = document.getElementById("title")
const categoriesList = document.getElementById("categories")

const wordInput = document.getElementById("word")
const reverseCheck = document.getElementById("reverse")

let currentCategory, letter, remainingWords

console.log(categories)

categories.forEach(category => {
    const element = document.createElement("li")

    element.textContent = category.name
    element.addEventListener("click", () => setCategory(category))

    categoriesList.appendChild(element)
})

reverseCheck.addEventListener("change", () => setCategory(currentCategory))

document.addEventListener("keydown", event => {
    const word = wordInput.value.toLowerCase()

    if (event.key !== "Enter") return

    wordInput.value = ""
    wordInput.style.borderColor = ERROR_COLOR;

    if (reverseCheck.checked && !word.endsWith(letter)) return
    if (!reverseCheck.checked && !word.startsWith(letter)) return

    if (!remainingWords.has(word.toLowerCase())) return
    
    remainingWords.delete(word.toLowerCase())
    wordInput.style.borderColor = SUCCESS_COLOR

    changeWord()
})

setCategory(categories[0])

function setCategory(category) {
    currentCategory = category

    remainingWords = new Set()
    category.words.forEach(word => remainingWords.add(word.toLowerCase()))

    categoriesList.childNodes.forEach(item => {
        item.classList.toggle("active", item.textContent == category.name)
    })

    changeWord()
}

function changeWord() {
    const remainingLetters = [...remainingWords].map(word => word.charAt(0).toLowerCase());
    letter = remainingLetters[Math.floor(Math.random() * remainingLetters.length)]

    const mode = reverseCheck.checked ? "ending" : "starting"
    title.textContent = currentCategory.title.replace("{letter}", letter.toUpperCase()).replace("{mode}", mode) + ` (${remainingWords.size} Remaining)`
}