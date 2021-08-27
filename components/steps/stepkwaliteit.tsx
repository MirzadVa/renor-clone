import Wrapper from "@/components/steps/wrapper";
import StepHeader from "@/components/stepheader";
import {useSubcategoriesViaCategory} from "@/lib/swr-hooks";
import StepAccordion from "@/components/steps/accordion";
import StepButton from './stepbutton'
import React from 'react'
import Loader from '../loader'
import {Col, Row} from 'react-bootstrap'
import Image from 'next/image'
import StepFooter from '../step-footer'

const StepKwaliteit = (props) => {
    const {isLoading, subcategories} = useSubcategoriesViaCategory("5")

    if (isLoading) {
        return (<>
        <Loader />
        </>)
    }
    return (
        <>
        <Wrapper {...props}>
            <StepHeader {...props} categoryId={5}/>
            <StepAccordion Name="Kwaliteit" subcategories={subcategories} categoryID="5" className="first-border"/>
            <StepButton {...props} title="OPSLAAN EN DOOR NAAR RESULTATEN" doneStep={'kwaliteitsborgingStep'}/>
        </Wrapper>
        {/* <StepFooter /> */}
        </>
    );
};

export default StepKwaliteit;