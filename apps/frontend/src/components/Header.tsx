import { Card, CardContent } from './ui/card'
import { Menu } from 'lucide-react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { useSidebar } from './ui/sidebar'
import { useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

function Header() {
  const { user } = useAuth()
  if (!user) return null // Jika user belum ada, jangan render header
  const {pathname} = useLocation()
  const{setOpenMobile} = useSidebar()
    

  return (
    <div className='sm-w-[96%] w-full z-10 fixed flex-col flex'>
      <Card className=" py-6 w-full rounded-none border-l-0 border-r-0 border-t-0">
        <CardContent className="w-full h-4 flex  justify-between">
            <Menu className="flex md:hidden self-center" onClick={() => setOpenMobile(true)}/>
            <span className="self-center text-xl capitalize font-medium hidden md:flex">{pathname.replace("/", "")}</span>
            <div className="flex gap-2 text-sm  text-center justify-center items-center">
              <span>
                Hello, {user.username.split(' ')[0].replace(/^./, c => c.toUpperCase())}
              </span>
            <Avatar className='sm:mr-0 md:mr-60 lg:mr-60 '>
                <AvatarFallback className=" bg-secondary size-8 p-2 justify-center flex items-center rounded-full">
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Header