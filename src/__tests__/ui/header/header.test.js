import React from 'react'
import Header from '../../../components/header'
import {render, screen} from '@testing-library/react'

describe('check rendering of the header',()=>{
    test('check rendering of header',()=>{
        render(<Header/>)
        const header = screen.queryAllByRole('banner')
        expect(header).toHaveLength(1)
    })
})