import { View, StyleSheet } from 'react-native'

export const GroupSections = ({ sections }) => {
    const result = []
    let pending = null

    for (const section of sections) {
        if (section.fullWidth !== false) {
            if (pending) {
                result.push(wrapSingle(pending))
                pending = null
            }

            result.push(section)
            continue
        }

        if (!pending) {
            pending = section
        } else {
            result.push(makePair(pending, section))
            pending = null
        }
    }

    if (pending) result.push(wrapSingle(pending))

    return result
}

const makePair = (sectionA, sectionB) => {
    return {
        id: `pair-${sectionA.id}-${sectionB.id}`,
        fullWidth: true,
        headerIcon: sectionA.headerIcon,
        headerTitle: sectionA.headerTitle,
        data: [{
            key: `pair-${sectionA.id}-${sectionB.id}`,
            valueA: sectionA.data[0].value,
            valueB: sectionB.data[0].value,
            sectionA,
            sectionB
        }],

        renderItem: ({ item }) => (
            <View style={pairStyles.row}>
                <View style={pairStyles.half}>
                    {sectionA.renderItem({ item: { key: sectionA.data[0].key, value: item.valueA } })}
                </View>
                <View style={pairStyles.half}>
                    {sectionB.renderItem({ item: { key: sectionB.data[0].key, value: item.valueB } })}
                </View>
            </View>
        )
    }
}

const wrapSingle = (section) => {
    return {
        ...section,
        fullWidth: true
    }
}

const pairStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: 10
    },
    half: {
        flex: 1
    }
})