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

const StepLicht = (props) => {
    const {isLoading, subcategories} = useSubcategoriesViaCategory("3")

    if (isLoading) {
        return (<>
            <Loader />
        </>)
    }
    return (
        <>
        <Wrapper {...props}>
            <StepHeader {...props}  categoryId={3}/>
            <StepAccordion Name="Licht" subcategories={subcategories} categoryID="3" className="first-border"/>
            <StepButton {...props} title="OPSLAAN EN DOOR NAAR GELUID" doneStep={'lichtStep'}/>
        </Wrapper>
        {/* <StepFooter /> */}
        </>
    );
};

export default StepLicht;