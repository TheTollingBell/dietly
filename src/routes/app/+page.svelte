<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import logo from '$lib/assets/logo.png';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';

	const foodData: { name: string; calories: number }[] = [];

	let uploadedImageURL: string | null = $state(null);
	let uploadedImage: File | null = $state(null);
	let guessedFood: string = $state('');
	let guessedCalories: number | null = $state(null);

	$inspect('uploadedImage', { uploadedImage });

	function handleImageUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			uploadedImage = target.files[0];
			uploadedImageURL = URL.createObjectURL(uploadedImage);
			// TODO: Call AI service to analyze image and get food data
			// For now, we will just set some dummy data
			guessedFood = 'Sample Food Item';
			guessedCalories = 250;
		}
	}
</script>

<div class="flex flex-col items-center justify-center h-screen">
	<a href="/">
		<Avatar.Root class="w-64 h-64 m-auto mb-0 mt-16">
			<Avatar.Image src={logo} alt="Diety" />
			<Avatar.Fallback>D</Avatar.Fallback>
		</Avatar.Root>
	</a>

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
						<Sheet.Trigger class={buttonVariants()}>Add Food</Sheet.Trigger>
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
											value={guessedFood}
										/>
										<Input
											type="number"
											placeholder="Guessed Calories"
											class="mt-4 w-full"
											value={guessedCalories}
										/>
										<Button class="mt-4 w-full">Add to Log</Button>
									{:else}
										<div class="mt-4">No image uploaded yet.</div>
									{/if}
								</Sheet.Description>
							</Sheet.Header>
						</Sheet.Content>
					</Sheet.Root>

					<!-- <Button variant="outline" class="mt-4 ml-2">Analyze</Button> -->
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>
