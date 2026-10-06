import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const apps = [
	{
		name: 'auth',
		description: 'You are here now',
		github: 'https://github.com/juener/portfolio/tree/main/auth',
		swagger: 'https://api.vallete.com/portfolio/auth/docs',
	},
	{
		name: 'messenger-app',
		description: 'Messenger app',
		link: 'https://portfolio.vallete.com/messenger-app',
		github: 'https://github.com/juener/portfolio/tree/main/messenger-app',
		swagger: 'https://api.vallete.com/portfolio/messenger-app/docs',
	},
	{
		name: 'infra',
		description: 'Infrastructure app',
		github: 'https://github.com/juener/portfolio/tree/main/infra',
	},
]

export default function ChooseAppPage() {
	return (
		<section className='flex-1 flex flex-col gap-4 justify-center text-background p-4 items-center w-full max-w-7xl mx-auto'>
			<h1 className='text-2xl font-bold'>This is a Portfolio Project</h1>
			<div className='flex flex-col gap-2 w-full max-w-2xl'>
				<p className='text-sm text-muted-foreground'>
					A collection of apps that I have built to showcase my skills and knowledge with no AI
					assistance.
				</p>
				<p className='text-sm text-muted-foreground'>
					AI helps speeding up the development coding, and we should always use it. However, this
					project intents to showcase in the old way.
				</p>
				<p className='text-sm text-muted-foreground'>
					Below are some of the apps that I have built. Click on the app to view the code and
					documentation.
				</p>
				<p className='text-sm text-muted-foreground'>
					Also, you can check the accordion with the question and answer to see how it works.
				</p>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full py-8'>
				{apps.map((app) => (
					<Card key={app.name} className='w-full'>
						<CardHeader>
							<CardTitle>{app.name}</CardTitle>
							<CardDescription>{app.description}</CardDescription>
						</CardHeader>
						<CardFooter className='flex flex-row gap-2'>
							{app.link && (
								<Button asChild>
									<a href={app.link} target='_blank' rel='noreferrer'>
										Live app
									</a>
								</Button>
							)}
							{app.github && (
								<Button asChild>
									<a href={app.github} target='_blank' rel='noreferrer'>
										GitHub repository
									</a>
								</Button>
							)}
							{app.swagger && (
								<Button asChild>
									<a href={app.swagger} target='_blank' rel='noreferrer'>
										Swagger docs
									</a>
								</Button>
							)}
						</CardFooter>
					</Card>
				))}
			</div>

			<Accordion type='single' collapsible defaultValue='github' className='w-full max-w-2xl'>
				<AccordionItem value='github'>
					<AccordionTrigger>I want to see the code of all these apps</AccordionTrigger>
					<AccordionContent className='text-sm text-muted-foreground'>
						Awesome! You can find the code of all these apps at{' '}
						<a
							href='https://github.com/juener/portfolio'
							className='text-blue-500 hover:text-red-500'
							target='_blank'
							rel='noreferrer'
						>
							GitHub repository
						</a>
						.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='swagger'>
					<AccordionTrigger>Also the Swagger documentation</AccordionTrigger>
					<AccordionContent className='text-sm text-muted-foreground'>
						Each app has its own Swagger documentation. Go to
						api.vallete.com/portfolio/[app-name]/docs to see the documentation. Ex.:
						<a
							href='https://api.vallete.com/auth/docs'
							className='text-blue-500 hover:text-red-500'
							target='_blank'
							rel='noreferrer'
						>
							GitHub repository
						</a>
						.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='shared-features'>
					<AccordionTrigger>Do the apps share anything?</AccordionTrigger>
					<AccordionContent className='text-sm text-muted-foreground'>
						The app `auth` generates a JWT token valid for all the portfolio apps, the `infra` app
						is responsible for the shared resources such as the database, cache, message broker, or
						any other available services. All the other apps are standalone and do not share any
						resources.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	)
}
