// tsrfc
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { cn } from '@/utils/cn';

type Props = {
    className ?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined; // just copy and pasted from hovering.
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox(props: Props) {
  return (
    <form className={cn('flex relative items-center justify-around max-w-sm w-full gap-2', props.className)} onSubmit={props.onSubmit}>
        <Input 
            type="text" 
            onChange={props.onChange}
            value={props.value}
            placeholder='Search...'
        />
        <Button type="submit"><Search className='w-5 h-5'/></Button>
    {/* <form>SearchBox</form> */}
    </form>
  )
}