import path from 'node:path'
import { addAlias } from 'module-alias'

addAlias('@', path.resolve(__dirname))

require('@/main')
