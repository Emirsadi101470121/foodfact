console.log("Script is running!");


class FoodFact {
    constructor() {
        this._selected = {
            dairy: null,
            snacks: null,
            vegetable: null,
            carbohydrate: null
        };
        this._card = document.querySelectorAll('.card');
        this._Resultsection = document.getElementById('selected_cards');
        this._button = document.getElementById('button');
        /*attaching the lockin buttonto the handlelockin method*/
        this._factIndex = {
            dairy: 0,
            snacks: 0,
            vegetable: 0,
            carbohydrate: 0
        };
        this._isLockedIn = false;

        this._button.addEventListener('click', () => {
            if (!this._isLockedIn) {
                this.handleLockIn();
            } else {
                this.resetApp();
            }
        });

        this._facts = {
            dairy: {
                milk: [
                    "Milk is 87% water.",
                    "Cheese is over 7,000 years old.",
                    "Yogurt helps digestion.",
                    "Butter is churned cream.",
                    "Calcium builds strong bones.",
                    "Cows make 6 gallons daily.",
                    "Cheese flavor comes from aging.",
                    "Milk has natural sugar: lactose.",
                    "Dairy cows eat 100 lbs daily.",
                    "There are 400+ cheese types."
                ],
                cheese: [
                    "Cheese dates back over 7,000 years.",
                    "There are over 1,800 cheese types.",
                    "Cheddar gets sharper with age.",
                    "Blue cheese has edible mold.",
                    "Mozzarella was first made in Italy.",
                    "Parmesan is aged for 12+ months.",
                    "Cheese can be made from goat milk.",
                    "Hard cheeses have less moisture.",
                    "Swiss cheese has holes from gas.",
                    "Smoked cheese has a rich flavor."
                ],
                yougurt: [
                    "Yogurt contains probiotics.",
                    "It's made by fermenting milk.",
                    "Greek yogurt is thicker.",
                    "Plain yogurt has no added sugar.",
                    "It supports digestive health.",
                    "Yogurt can be frozen into snacks.",
                    "It’s rich in calcium and protein.",
                    "Flavored yogurts have fruit blends.",
                    "Yogurt helps support your gut.",
                    "It's been eaten since 5000 BCE."
                ]
            },
            snacks: {
                chips: [
                    "Potato chips were invented in 1853.",
                    "They were created by accident.",
                    "Chips are a popular salty snack.",
                    "They're often deep-fried or baked.",
                    "Flavors range from classic to wild.",
                    "They're usually thin and crispy.",
                    "Barbecue is a top-selling flavor.",
                    "Chips can be made from sweet potato.",
                    "Packaging keeps them fresh longer.",
                    "Too many chips? Blame the crunch."
                ],
                cookies: [
                    "Cookies originated in Persia.",
                    "Chocolate chip is the most popular.",
                    "Cookies can be soft or crunchy.",
                    "They’re often baked in batches.",
                    "Oatmeal cookies are heartier.",
                    "Cookies are a classic lunch treat.",
                    "You can freeze cookie dough.",
                    "Some cookies use peanut butter.",
                    "They often pair well with milk.",
                    "There’s a cookie for every mood."
                ],
                donut: [
                    "Donuts are fried dough rings.",
                    "They often have sweet glazes.",
                    "Filled donuts hide sweet centers.",
                    "The hole makes them cook evenly.",
                    "Donuts date back to Dutch settlers.",
                    "Sprinkles make them colorful.",
                    "National Donut Day is in June.",
                    "They come in endless flavors.",
                    "Bakeries make them fresh daily.",
                    "Donuts and coffee are a classic pair."
                ],
            },
            vegetable: {
                broccoli: [
                    "Broccoli is rich in vitamin C.",
                    "It belongs to the cabbage family.",
                    "It can be eaten raw or cooked.",
                    "Steaming keeps its nutrients.",
                    "Broccoli has cancer-fighting compounds.",
                    "It grows best in cool weather.",
                    "The florets are the flowering part.",
                    "It’s a great source of fiber.",
                    "Broccoli leaves are also edible.",
                    "It’s over 90% water."
                ],
                carrot: [
                    "Carrots are high in beta-carotene.",
                    "They improve night vision.",
                    "They come in many colors.",
                    "Orange is the most common.",
                    "They were first grown in Persia.",
                    "Carrots can be eaten raw or cooked.",
                    "They’re naturally sweet.",
                    "Carrots help skin health.",
                    "They grow underground.",
                    "Carrot tops are also edible."
                ],
                cauliflower: [
                    "Cauliflower is a cruciferous veggie.",
                    "It’s related to broccoli.",
                    "It comes in white, purple, and orange.",
                    "It’s low in calories and carbs.",
                    "It’s often used as a rice substitute.",
                    "Roasting brings out its flavor.",
                    "It grows in a tight, compact head.",
                    "Cauliflower leaves are edible.",
                    "It’s a good source of vitamin K.",
                    "It’s 92% water by weight."
                ]
            },
            carbohydrate: {
                bread: [
                    "Bread is one of the oldest foods.",
                    "It’s made from flour, water, and yeast.",
                    "Whole grain bread has more fiber.",
                    "Flatbreads are popular worldwide.",
                    "Bread can be leavened or unleavened.",
                    "It’s a staple in many cultures.",
                    "Sourdough uses natural fermentation.",
                    "Toast is simply cooked bread.",
                    "Bread can be savory or sweet.",
                    "It pairs well with almost anything."
                ],
                pasta: [
                    "Pasta originated in Italy.",
                    "It’s made from wheat and water.",
                    "There are over 300 pasta shapes.",
                    "Al dente means 'to the tooth'.",
                    "Pasta is often boiled before serving.",
                    "It absorbs flavor from sauces.",
                    "Whole wheat pasta has more fiber.",
                    "Pasta can be dried or fresh.",
                    "It cooks in under 10 minutes.",
                    "Tomato sauce is a classic pairing."
                ],
                rice: [
                    "Rice is a global food staple.",
                    "White rice is milled and polished.",
                    "Brown rice has more nutrients.",
                    "Jasmine rice has a floral aroma.",
                    "Basmati rice is long-grain and fluffy.",
                    "Rice paddies grow in wet conditions.",
                    "It's used in sweet and savory dishes.",
                    "Sushi uses short-grain sticky rice.",
                    "Uncooked rice lasts for years.",
                    "Steamed rice is light and fluffy."
                ]
            }
        }
    }
    handleCardClick() {
        for (let key in this._selected) {
            for (let card of this._card) {
                // ✅ Prevent adding duplicate listeners
                if (!card.dataset.listenerAttached) {
                    card.addEventListener('click', () => {

                        console.log("Card clicked:", card.id);
                        console.log("Updated selected:", this._selected);

                        let cardId = card.id;
                        let category = cardId.split('_')[0];

                        for (let c of this._card) {
                            if (c.id.startsWith(category)) {
                                c.classList.remove('selected');
                            }
                        }

                        card.classList.add('selected');

                        this._selected[category] = {
                            id: card.id,
                            img: card.querySelector('img').src,
                            text: card.querySelector('p').textContent
                        };
                    });

                    // ✅ Mark listener as attached
                    card.dataset.listenerAttached = "true";
                }
            }
        }
    }

    handleLockIn() {

        console.log("LOCK IN triggered again");
        console.log("Current selections:", this._selected);

        /*object.value() returns a values of an object in shape of array*/
        if (Object.values(this._selected).every(item => item !== null)) {

            this._Resultsection.style.display = 'block';/*this line actually make the result section to
                                                        appear*/

            /*section below is for whats need to transfer the selected card to our appeared section */

            const map = {

                dairy: 'first',
                snacks: 'secound',
                vegetable: 'third',
                carbohydrate: 'fourth'

            }

            for (let keys in this._selected) {

                console.log("Displaying result card for:", keys, "→", map[keys]);

                let resultCard = document.getElementById(map[keys]);
                resultCard.querySelector('img').src = this._selected[keys].img;
                resultCard.querySelector('p').textContent = this._selected[keys].text;

                const selectedItem = this._selected[keys].img.split('/').pop().split('.')[0];
                resultCard.querySelector('img').alt = selectedItem;
                document.getElementById(this._selected[keys].id).style.display = 'none';/*this one actually make the selected card to disappear in its originall section */
                console.log("Hiding original card:", this._selected[keys].id);
                document.getElementById(map[keys]).style.display = 'block';


            }
            this.setupFactCycling();
            this._isLockedIn = true;
            console.log("Locked in flag set to:", this._isLockedIn);

            this._button.textContent = 'Refresh';

        }
    }
    setupFactCycling() {



        const map = {
            dairy: 'first',
            snacks: 'secound',
            vegetable: 'third',
            carbohydrate: 'fourth'

        }

        for (let keys in this._selected) {

            let resultCard = document.getElementById(map[keys])

            /*check the category with if first: */
            resultCard.addEventListener('click', () => {

                const selectedItem = resultCard.querySelector('img').alt;


                for (let cards in this._facts[keys]) {

                    if (cards === selectedItem) {
                        let index = this._factIndex[keys];
                        this._factIndex[keys] = (index + 1) % 10;/* the %10 makes sure that it turns it into zero after reaching the 9th index */
                        resultCard.querySelector('p').textContent = this._facts[keys][cards][index];
                    }
                }
            })
        }
    }

    resetApp() {
        console.log("RESET triggered");

        const map = {
            dairy: 'first',
            snacks: 'secound',
            vegetable: 'third',
            carbohydrate: 'fourth'
        };

        // 1. Show original cards again and hide result cards
        for (let keys in this._selected) {
            const selected = this._selected[keys];
            if (selected && selected.id) {
                const originalCard = document.getElementById(selected.id);
                if (originalCard) originalCard.style.display = 'block';
            }

            const resultCard = document.getElementById(map[keys]);
            if (resultCard) resultCard.style.display = 'none';
        }

        // 2. Reset selection and indexes
        for (let key in this._selected) {
            this._selected[key] = null;
        }

        for (let key in this._factIndex) {
            this._factIndex[key] = 0;
        }

        // 3. Hide result section
        this._Resultsection.style.display = 'none';

        // 4. Remove LED glow and allow re-attaching event listeners
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.remove('selected');
            delete card.dataset.listenerAttached; // 💥 Reset click logic
        });

        // 5. Reset button and internal state
        this._isLockedIn = false;
        this._button.textContent = 'LOCK IN';
        console.log("Locked in flag reset to:", this._isLockedIn);

        this._card = document.querySelectorAll(
            '#dairy .card, #snacks .card, #vegetable .card, #carbohydrate .card'
        );

        // 6. Re-activate card selection logic
        this.handleCardClick();
    }



}
console.log("Script loaded successfully")

const app = new FoodFact();
app.handleCardClick();

