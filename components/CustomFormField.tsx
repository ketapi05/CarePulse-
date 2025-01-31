import React, { useState } from 'react';
import Image from "next/image";
import { E164Number } from 'libphonenumber-js/core';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input"
  import { Control } from 'react-hook-form';
import { FormFieldType } from './forms/PatientForm';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,
}

const RenderField = ({ field, props}: {field:any; props: CustomProps}) => {
    const { fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton } = props;
    // const [country, setCountry] = useState("US");
    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    {iconSrc && (
                        <Image
                         src={iconSrc}
                         height={24}
                         width={24}
                         alt={iconAlt || 'icon'}
                         className='ml-2'
                         />
                    )}
                    <FormControl>
                        <Input 
                           placeholder={placeholder}
                           {...field}
                           className='shad-input border-0'
                           />
                    </FormControl>
                </div>
            )
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                     defaultCountry="US"
                     placeholder={placeholder}
                     international
                     withCountryCallingCode
                     value={field.value as 'E164Number' | undefined}
                     onChange={field.onChange}
                     className='input-phone'
                     />
                </FormControl>
            )
        case FormFieldType.DATE_PICKER:
            return (
                <div className='flex rounded-md border
                 border-dark-500 bg-dark-400'>
                    <Image
                      src="/assets/icons/calender.svg"
                      height={24}
                      width={24}
                      alt="user"
                      className='ml-2'
                      />
                      <FormControl>
                      <ReactDatePicker 
                         selected={field.value} 
                         onChange={(date) => field.onChange(date)} 
                         dateFormat={props.dateFormat ?? 
                            'MM/dd/yyyy'
                         }
                         showTimeSelect={props.showTimeSelect ??
                            false
                         }
                         timeInputLabel='Time:'
                         wrapperClassName='date-picker'
                        />
                      
                      </FormControl>
                </div>
            )    
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onchange}
                     defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger 
                              className='shad-select-trigger'>
                             <SelectValue placeholder={placeholder}/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className='shad-select-content'>
                           {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            )
        
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea placeholder={placeholder}
                    {...field}
                    className='shad-textArea'
                    disabled={props.disabled}
                    />
                    
                </FormControl>
            )    
        case FormFieldType.SKELETON:
            return  (
                props.renderSkeleton ? props.renderSkeleton(field): null
            )

        case FormFieldType.CHECKBOX:
                return (
                    <FormControl>
                        <div className='flex items-center gap-4'>
                           <Checkbox 
                           id={props.name}
                           checked={field.value}
                           onCheckedChange={field.onChange} 
                           />
                           <label htmlFor={props.name}
                           className='checkbox-label'>
                            {props.label}
                           </label>
                        </div>
                    </FormControl>
                )

    }
    
}

const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, label } = props;
   return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            // <FormItem>
            //   <FormLabel>Username</FormLabel>
            //   <FormControl>
            //     <Input placeholder="shadcn" {...field} />
            //   </FormControl>
            //   <FormDescription>
            //     This is your public display name.
            //   </FormDescription>
            //   <FormMessage />
            // </FormItem>
            <FormItem className='flex-1'>
                 {fieldType !== FormFieldType.CHECKBOX && label && (
                    <FormLabel>{label}</FormLabel>
                 )}
                 
                 <RenderField field={field} props={props} />

                 <FormMessage className='shad-error' />

            </FormItem>
          )}
        />
  )
}

export default CustomFormField