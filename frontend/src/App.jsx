import { useState } from 'react'
import './App.css'
import Navbar from './Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import CodeGen from './Body/CodeGen'
import BugDec  from './Body/BugDec'
import CodeExpl from './Body/CodeExpl'
import Resume from './Body/Resume'
import CodeAi from './Components/CodeAi'
import Sign from './Components/Sign'
import Login from './Components/Login'
import ContactUs from './Components/ContactUs'
import AI from './Components/AI'
import { useLocation } from 'react-router-dom'
import LangConversion from './Body/LangConversion'
import DatabaseCode from './Body/DatabaseCode'
import Differencecode from './Body/Differencecode'
import Optimization from './Body/Optimization'
import Website from './Body/Website'

function App() {
  let location=useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname==='/contact-us' || location.pathname==='/AI';

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/code-generation" element={<CodeGen />} />
        <Route path='/Bug-Detector' element={<BugDec />} />
        <Route path='/code-explanations' element={<CodeExpl/>}/>
        <Route path='/resume-analysis' element={<Resume/>}/>
        <Route path='/LangCon' element={<LangConversion/>}/>
        <Route path='/databasecode' element={<DatabaseCode/>}/>
        <Route path='/difference' element={<Differencecode/>}/>
        <Route path='/optimize' element={<Optimization/>}/>
        <Route path='/website' element={<Website/>}/>
        <Route path='/' element={<CodeAi/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Sign/>}/>
        <Route path='/contact-us' element={<ContactUs/>}/>
        <Route path='/AI' element={<AI/>}/>
      </Routes>
    </>
  )
}

export default App
