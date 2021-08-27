import Wrapper from "@/components/steps/wrapper";
import StepHeader from "@/components/stepheader";
import StepAccordion from "@/components/steps/accordion";
import {useSubcategoriesViaCategory} from "@/lib/swr-hooks";
import StepButton from './stepbutton'
import React from 'react'
import Loader from '../loader'
import {Row, Col} from 'react-bootstrap'
import Image from 'next/image'
import StepFooter from '../step-footer'

const StepGeluid = (props) => {
    const {isLoading, subcategories} = useSubcategoriesViaCategory("4")

    if (isLoading) {
        return (<>
        <Loader />
        </>)
    }

    return (
        <>
        <Wrapper {...props}>
            <StepHeader {...props} categoryId={4}/>
            <StepAccordion Name="Geluid" subcategories={subcategories} categoryID="4" className="first-border"/>
            <StepButton {...props} title="OPSLAAN EN DOOR NAAR KWALITEITSBORGING" doneStep={'geluidStep'}/>
        </Wrapper>
        {/* <StepFooter /> */}
        </>
    );
};

export default StepGeluid;