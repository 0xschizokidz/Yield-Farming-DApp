// src/app/layout.tsx   
import { Source_Code_Pro } from 'next/font/google';  
import { Inter } from "next/font/google";  
import { Space_Grotesk } from "next/font/google";  
import { Flex } from '@chakra-ui/react';
import { Providers } from '../app/providers/providers';

// Load custom fonts  
const primary = Inter({  
    variable: '--font-primary',  
    subsets: ['latin'],  
    display: 'swap'  
});  

const tertiary = Space_Grotesk({  
    variable: '--font-tertiary',  
    subsets: ['latin'],  
    display: 'swap'  
});  

const code = Source_Code_Pro({  
    variable: '--font-code',  
    subsets: ['latin'],  
    display: 'swap',  
});  


export default function RootLayout({  
    children,  
}: {  
    children: React.ReactNode;  
}) {  
    return (  
        <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
        
    );  
}
