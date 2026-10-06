import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import LoginForm from './login/LoginForm'
import RegisterForm from './register/RegisterForm'

export default function Home() {
	return (
		<>
			<section className='flex-1 flex flex-col justify-center p-4 text-background'>
				<h1 className='text-4xl font-bold'>Authentication</h1>
				<p className='text-lg'>After logged in, you will have access to our portfolio apps.</p>
			</section>
			<section className='w-full md:w-1/2 xl:w-1/3 bg-primary/20 rounded-md m-2 flex flex-col justify-center items-center'>
				<Tabs className='w-full p-4' defaultValue='login'>
					<TabsList className='w-full'>
						<TabsTrigger value='login' className='w-full'>
							Login
						</TabsTrigger>
						<TabsTrigger value='register' className='w-full'>
							Register
						</TabsTrigger>
					</TabsList>
					<TabsContent value='login' className='w-full min-h-24'>
						<LoginForm />
					</TabsContent>
					<TabsContent value='register'>
						<RegisterForm />
					</TabsContent>
				</Tabs>
			</section>
		</>
	)
}
