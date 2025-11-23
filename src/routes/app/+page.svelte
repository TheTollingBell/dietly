<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import logo from '$lib/assets/logo.png';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';

	let foodData: { name: string; calories: number }[] = $state([]);

    $effect(() => {
        foodData = JSON.parse(localStorage.getItem('foodData') || '[]');
    });

	let uploadedImageURL: string | null = $state(null);
	let uploadedImage: File | null = $state(null);
	let guessedFood: string = $state('');
	let guessedCalories: number | null = $state(null);

    function getBase64DataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

	function handleImageUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			uploadedImage = target.files[0];
			uploadedImageURL = URL.createObjectURL(uploadedImage);

            (async () => {
                fetch("/api/ai/analyze", {
                    method: "POST",
                    headers: {
                        "Content-Type": "image/jpeg"
                    },
                    body: await getBase64DataURL(uploadedImage)
                }).then(async (res) => {
                    if (res.status === 200) {
                        const data = await res.json();
                        guessedFood = data.name;
                        guessedCalories = data.cal;
                    } else {
                        alert("Error analyzing image");
                    }
                });
            })();
            
			
		}
	}


    function handleAddItem() {
        if (guessedFood && guessedCalories) {
            foodData.push({ name: guessedFood, calories: guessedCalories });
            localStorage.setItem('foodData', JSON.stringify(foodData));
            // Reset inputs
            uploadedImage = null;
            uploadedImageURL = null;
            guessedFood = '';
            guessedCalories = null;
        } else {
            alert('Please provide both food name and calories.');
        }
    }

    let adviceList: string[] = $state([]);
    let hasAdviceBeenGenerated: boolean = $state(false);

    function generateAdvice(open: boolean) {
        if (!open) {
            adviceList = [];
            hasAdviceBeenGenerated = false;
            return;
        }

        fetch("api/ai/advice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(foodData)
        }).then(async (res) => {
            if (res.status === 200) {
                const data = await res.json();
                adviceList = data;
                hasAdviceBeenGenerated = true;
            } else {
                alert("Error generating advice");
            }
        })

        adviceList = [
            "Try to include more vegetables in your meals.",
            "Consider reducing your intake of sugary drinks.",
            "Aim for balanced meals with protein, carbs, and fats.",
            "Stay hydrated throughout the day.",
            "Incorporate regular physical activity into your routine."
        ];
        hasAdviceBeenGenerated = true;
    }

    function handleLogout() {
        alert('Logged out');
        alert('TODO');
        // TODO: Implement logout functionality
    }

</script>

<div class="flex flex-col items-center justify-center h-screen">
	<a href="/">
		<Avatar.Root class="w-64 h-64 m-auto mb-0 mt-16">
			<Avatar.Image src={logo} alt="Dietly" />
			<Avatar.Fallback>D</Avatar.Fallback>
		</Avatar.Root>
	</a>

    <Button class="mb-8 mt-0" variant="outline" onclick={handleLogout}>Logout</Button>

	<div class="m-auto mt-0">
		<Card.Root class="w-140">
			<Card.Header>
				<Card.Title>Food Log</Card.Title>
			</Card.Header>
			<Card.Content>
				{#each foodData as food}
					<div class="flex justify-between">
						<div>{food.name}</div>
						<div>{food.calories} kcal</div>
					</div>
				{/each}
				<div class="flex justify-between font-bold mt-4">
					<div>Total</div>
					<div>{foodData.reduce((total, food) => total + food.calories, 0)} kcal</div>
				</div>
				<div class="flex justify-center">
					<Sheet.Root>
						<Sheet.Trigger class={buttonVariants() + " mt-4 ml-2"}>Add Food</Sheet.Trigger>
						<Sheet.Content>
							<Sheet.Header>
								<Sheet.Title>Add a food item</Sheet.Title>
								<Sheet.Description>
									<div class="mb-4">
										Upload a photo of your food to analyze its nutritional content.
									</div>
									<Input type="file" accept="image/*" onchange={handleImageUpload} />
									{#if uploadedImage}
										<img src={uploadedImageURL} alt="Uploaded Food" class="mt-4 max-h-48" />
										<Input
											type="text"
											placeholder="Guessed Food Item"
											class="mt-4 w-full"
											bind:value={guessedFood}
										/>
										<Input
											type="number"
											placeholder="Guessed Calories"
											class="mt-4 w-full"
											bind:value={guessedCalories}
										/>
										<Button class="mt-4 w-full" onclick={handleAddItem}>Add to Log</Button>
									{:else}
										<div class="mt-4">No image uploaded yet.</div>
									{/if}
								</Sheet.Description>
							</Sheet.Header>
						</Sheet.Content>
					</Sheet.Root>

					<!-- <Button variant="outline" class="mt-4 ml-2">Analyze</Button> -->
                    <Sheet.Root onOpenChange={generateAdvice}>
						<Sheet.Trigger class={buttonVariants() + " mt-4 ml-2"}>Analyze</Sheet.Trigger>
						<Sheet.Content>
							<Sheet.Header>
								<Sheet.Title>Analyze your log</Sheet.Title>
								<Sheet.Description>
									<div class="mb-4">
										Here is the analysis of your eating habits and some improvements that you can make.
									</div>

                                    {#if hasAdviceBeenGenerated}
                                        <ul class="list-disc list-inside">
                                            {#each adviceList as advice}
                                                <li>{advice}</li>
                                            {/each}
                                        </ul>
                                    {:else}
                                        <div>Generating...</div>
                                    {/if}
									
								</Sheet.Description>
							</Sheet.Header>
						</Sheet.Content>
					</Sheet.Root>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>
