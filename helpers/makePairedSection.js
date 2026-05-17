import { PairedSectionItem } from '../src/components/PairedSections'

export const makePairedSection = (left, right) => {
    return {
        id: `paired-${left.id}-${right.id}`,
        isPaired: true,
        leftIcon: left.headerIcon,
        leftTitle: left.headerTitle,
        rightIcon: right.headerIcon,
        rightTitle: right.headerTitle,
        data: [{
            key: `paired-${left.id}-${right.id}-item`,
            left: {
                icon: left.headerIcon,
                title: left.headerTitle,
                data: left.data,
                Component: left.Component
            },
            right: {
                icon: right.headerIcon,
                title: right.headerTitle,
                data: right.data,
                Component: right.Component
            }
        }],
        renderItem: ({ item }) => (
            <PairedSectionItem left={item.left} right={item.right} />
        )
    }
}