import Wrapper from "@/components/steps/wrapper";
import StepHeader from "@/components/stepheader";
import {useSubcategoriesViaCategory} from "@/lib/swr-hooks";
import StepAccordion from "@/components/steps/accordion";
import StepButton from './stepbutton'
import React from 'react'
import Loader from '../loader'
import {Row, Col} from 'react-bootstrap'
import Image from 'next/image'
import StepFooter from '../step-footer'

const StepKlimaat = (props) => {

    const {isLoading, subcategories} = useSubcategoriesViaCategory("2")

    if (isLoading) {
        return (<>
        <Loader />
        </>)
    }
    return (
        <>
        <Wrapper {...props}>
            <StepHeader {...props} categoryId={2}/>
            <StepAccordion Name="Klimaat" subcategories={subcategories} categoryID="2"  className="first-border"/>
            <StepButton {...props} title="OPSLAAN EN DOOR NAAR LICHT" doneStep={'klimaatStep'} />
        </Wrapper>
        {/* <StepFooter /> */}
         </>
    );
};

export default StepKlimaat;