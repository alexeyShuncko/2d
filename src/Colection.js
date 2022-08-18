
    class IndexMap extends Map {

        // Получение значения элемента по индексу
        getIndex(index) {
            if (this.hasIndex(index)) {
                return [...this][index][1]
            } else console.error('Такого индекса нет в коллекции') 
        }
        // Проверка наличия элемента по индексу
        hasIndex(index) {
            if ([...this][index]) {
                return true
            } else
                return false
        }
        // Удаление элемента по индексу
        removeIndex(index) {
            if (this.hasIndex(index)) {
            let key = [...this][index][0]
            this.delete(key)
            return this
            } else console.error('Такого индекса нет в коллекции') 
        }
        // Объединение коллекций
        union(coll) {
            coll.forEach((value, key) => this.set(key, value))
            return this
        }
        // Коллекция уникальных значений
        uniq() {
            return new Set(this.values())
        }
        // Сортировка по индексу (обратный порядок)
        sortIndex() {
            let arr = [...this].reverse()
            this.clear()
            arr.forEach(a => this.set(a[0], a[1]))
            return this
        }
        // Сортировка по значению
        sort() {
            let arr = [...this].sort((a, b) => a[1] - b[1])
            this.clear()
            arr.forEach(a => this.set(a[0], a[1]))
            return this
        }
        // Добавить элемент после индекса
        setTo(index, key, value) {

            if (this.hasIndex(index + 1)) {
                // +1 чтобы иметь возможность вставить элемент в самое начало указав индекс -1
                let fromArr = [...this].slice(0, index + 1)
                let toArr = [...this].slice(index + 1, [...this].length)
                this.clear()
                fromArr.forEach(a => this.set(a[0], a[1]))
                this.set(key, value)
                toArr.forEach(a => this.set(a[0], a[1]))
                return this
            } else console.error('Такого индекса нет в коллекции')
        }
        // Удалить элемент после индекса
        removeAt(index, count = 1) {

            if (this.size - 1 === index) {
                console.error(`${index} элемент является последним`)
            }

            if (this.hasIndex(index + 1)) {
                // +1 чтобы иметь возможность удалить первый элемент указав индекс -1
                let fromArr = [...this].slice(0, index + 1)
                let toArr = [...this].slice(index + 2 + count - 1, [...this].length)
                this.clear()
                fromArr.forEach(a => this.set(a[0], a[1]))
                toArr.forEach(a => this.set(a[0], a[1]))
                return this
            } else {
                console.error('Такого индекса нет в коллекции')
            }
        }

    }
    const entries = [
        ['first', 11111],
        ['second', 2222],
        ['third', 33333],
    ]
    const entries1 = [
        ['fourth', 44],
        ['fifth', 44],
    ]


    const map = new IndexMap(entries)
    const map1 = new IndexMap(entries1)


