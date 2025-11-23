<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import logo from '$lib/assets/logo.png';
</script>

<div class="flex flex-col items-center justify-center h-screen">
	<Avatar.Root class="w-64 h-64 -mt-32">
		<Avatar.Image src={logo} alt="Dietly" />
		<Avatar.Fallback>D</Avatar.Fallback>
	</Avatar.Root>
	<div class="grid grid-cols-2 gap-4">
		<div class="flex flex-col m-auto">
			<div class="font-bold text-6xl m-auto">Dietly⚡</div>
			<Separator class="my-4" />
			<div class="ml-2 m-auto">Your AI-Powered food diary!</div>
            <div class="m1-2 m-auto">Reach your calorie goal responsibly.</div>
            <div class="ml-2 m-auto">Track your meals effortlessly.</div>
			<div class="ml-2 m-auto">How will you stay healthy this year?</div>
            <!-- add more descriptions of what it does -->
		</div>
		<div class="m-auto">
			<Card.Root class="w-80">
				<Card.Header>
					<Card.Title>Sign in / Sign Up</Card.Title>
				</Card.Header>
				<Card.Content>
					<a href="/login">
						<Button class="w-full">Sign in</Button>
					</a>
					<Separator class="my-4" />
					<a href="/signup">
						<Button variant="outline" class="w-full">Sign Up</Button>
					</a>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>
