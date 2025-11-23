<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import logo from '$lib/assets/logo.png';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
</script>

<div class="flex flex-col items-center justify-center h-screen">
	<Avatar.Root class="w-64 h-64 m-auto mb-0 mt-16">
		<Avatar.Image src={logo} alt="Diety" />
		<Avatar.Fallback>D</Avatar.Fallback>
	</Avatar.Root>
	<div class="m-auto mt-0">
		<Card.Root class="w-80">
			<Card.Header>
				<Card.Title>Sign in</Card.Title>
			</Card.Header>
			<Card.Content>
				<Input type="text" placeholder="Username" class="mb-4 w-full" />
				<Input type="password" placeholder="Password" class="mb-4 w-full" />
				<Separator class="my-4" />
				<Button class="w-full">Sign in</Button>
			</Card.Content>
		</Card.Root>
	</div>
</div>
